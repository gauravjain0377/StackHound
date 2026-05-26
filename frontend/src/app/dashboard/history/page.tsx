'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExecutionStep {
  nodeId: string;
  nodeName: string;
  inputData: Record<string, any>;
  outputData: Record<string, any>;
  error?: string;
  duration: number;
}

interface ExecutionLog {
  _id: string;
  workspaceId: string;
  workflowId?: string;
  status: 'running' | 'success' | 'failed';
  startedAt: string;
  completedAt?: string;
  steps: ExecutionStep[];
  createdAt: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    + ' · '
    + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function formatDuration(start: string, end?: string) {
  if (!end) return '—';
  const ms = new Date(end).getTime() - new Date(start).getTime();
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function syntaxHighlight(json: string): string {
  return json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = 'json-number';
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'json-key' : 'json-string';
        } else if (/true|false/.test(match)) {
          cls = 'json-bool';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ExecutionLog['status'] }) {
  const config = {
    success: {
      color: '#22c55e',
      bg: 'rgba(34,197,94,0.08)',
      border: 'rgba(34,197,94,0.2)',
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
      label: 'Success',
    },
    failed: {
      color: '#ef4444',
      bg: 'rgba(239,68,68,0.08)',
      border: 'rgba(239,68,68,0.2)',
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      ),
      label: 'Failed',
    },
    running: {
      color: '#f59e0b',
      bg: 'rgba(245,158,11,0.08)',
      border: 'rgba(245,158,11,0.2)',
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: 'Running',
    },
  }[status];

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      padding: '3px 8px',
      borderRadius: '6px',
      background: config.bg,
      border: `1px solid ${config.border}`,
      color: config.color,
      fontSize: '12px',
      fontWeight: 500,
      whiteSpace: 'nowrap',
    }}>
      {config.icon}
      {config.label}
    </div>
  );
}

// ─── Step Card in Slide-over ──────────────────────────────────────────────────

function StepCard({ step, index }: { step: ExecutionStep; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div style={{
      border: '1px solid #27272a',
      borderRadius: '10px',
      overflow: 'hidden',
      background: '#0c0c0e',
    }}>
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '22px', height: '22px', borderRadius: '6px',
            background: step.error ? 'rgba(239,68,68,0.12)' : 'rgba(6,182,212,0.1)',
            border: `1px solid ${step.error ? 'rgba(239,68,68,0.25)' : 'rgba(6,182,212,0.2)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: step.error ? '#ef4444' : '#06b6d4',
            fontSize: '10px', fontWeight: 700, flexShrink: 0,
          }}>
            {index + 1}
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#e4e4e7', textTransform: 'capitalize' }}>
            {step.nodeName}
          </span>
          {step.error && (
            <span style={{ fontSize: '11px', color: '#ef4444', background: 'rgba(239,68,68,0.08)', padding: '1px 6px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.2)' }}>
              Error
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <span style={{ fontSize: '11px', color: '#52525b' }}>{step.duration}ms</span>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {step.error && (
                <div style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: 'rgba(239,68,68,0.06)',
                  border: '1px solid rgba(239,68,68,0.15)',
                  color: '#f87171',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  lineHeight: 1.6,
                }}>
                  {step.error}
                </div>
              )}

              {/* Input */}
              <div>
                <p style={{ fontSize: '10px', fontWeight: 600, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Input</p>
                <pre
                  style={{
                    margin: 0, padding: '10px 12px', borderRadius: '8px',
                    background: '#0a0a0b', border: '1px solid #27272a',
                    fontSize: '11.5px', lineHeight: 1.7, overflowX: 'auto',
                    color: '#a1a1aa', fontFamily: 'var(--font-mono)',
                    maxHeight: '200px', overflowY: 'auto',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: syntaxHighlight(JSON.stringify(step.inputData, null, 2)),
                  }}
                />
              </div>

              {/* Output */}
              <div>
                <p style={{ fontSize: '10px', fontWeight: 600, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Output</p>
                <pre
                  style={{
                    margin: 0, padding: '10px 12px', borderRadius: '8px',
                    background: '#0a0a0b', border: '1px solid #27272a',
                    fontSize: '11.5px', lineHeight: 1.7, overflowX: 'auto',
                    color: '#a1a1aa', fontFamily: 'var(--font-mono)',
                    maxHeight: '200px', overflowY: 'auto',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: syntaxHighlight(JSON.stringify(step.outputData, null, 2)),
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Slide-over Panel ─────────────────────────────────────────────────────────

function SlideOver({ log, onClose }: { log: ExecutionLog; onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)', zIndex: 50,
        }}
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: 'min(520px, 100vw)',
          background: '#111113',
          borderLeft: '1px solid #27272a',
          zIndex: 51,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Panel Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #1f1f23',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '12px',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <StatusBadge status={log.status} />
              <span style={{ fontSize: '11px', color: '#52525b' }}>
                {log.steps.length} step{log.steps.length !== 1 ? 's' : ''}
              </span>
            </div>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#f4f4f5', margin: 0, letterSpacing: '-0.01em' }}>
              Execution Run
            </h2>
            <p style={{ fontSize: '12px', color: '#52525b', margin: '4px 0 0' }}>
              {formatDate(log.startedAt)} · {formatDuration(log.startedAt, log.completedAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px', height: '32px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', borderRadius: '8px', border: '1px solid #27272a',
              background: 'transparent', color: '#71717a', cursor: 'pointer',
              flexShrink: 0, transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = '#3f3f46';
              (e.currentTarget as HTMLElement).style.color = '#f4f4f5';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = '#27272a';
              (e.currentTarget as HTMLElement).style.color = '#71717a';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Steps */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {log.steps.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#52525b', fontSize: '13px' }}>
              No steps recorded for this run.
            </div>
          ) : (
            log.steps.map((step, i) => (
              <StepCard key={`${step.nodeId}-${i}`} step={step} index={i} />
            ))
          )}
        </div>
      </motion.div>
    </>
  );
}

// ─── Skeleton Row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr style={{ borderBottom: '1px solid #18181b' }}>
      {[40, 160, 140, 80, 80].map((w, i) => (
        <td key={i} style={{ padding: '14px 20px' }}>
          <div style={{ height: '14px', width: `${w}px`, borderRadius: '4px', background: '#18181b', animation: 'pulse 1.5s ease-in-out infinite' }} />
        </td>
      ))}
    </tr>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HistoryPage() {
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ExecutionLog | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/execution-logs`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const json = await res.json();
      setLogs(json.data ?? []);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load history');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#ffffff' }}>

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid #18181b', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#52525b' }}>
          <span>Dashboard</span>
          <span>/</span>
          <span style={{ color: '#a1a1aa' }}>Run History</span>
        </div>
        <button
          onClick={fetchLogs}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '6px 12px', borderRadius: '7px',
            border: '1px solid #27272a', background: 'transparent',
            color: '#71717a', fontSize: '12px', cursor: 'pointer',
            transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = '#3f3f46';
            (e.currentTarget as HTMLElement).style.color = '#f4f4f5';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = '#27272a';
            (e.currentTarget as HTMLElement).style.color = '#71717a';
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          Refresh
        </button>
      </div>

      <div style={{ padding: '24px' }}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 600, margin: '0 0 4px', letterSpacing: '-0.02em', color: '#f4f4f5' }}>
              Run History
            </h1>
            <p style={{ color: '#52525b', margin: 0, fontSize: '13px' }}>
              Detailed logs of every workflow execution.
            </p>
          </div>
          {!loading && (
            <div style={{
              display: 'flex', gap: '16px', fontSize: '12px', color: '#52525b',
            }}>
              <span style={{ color: '#22c55e' }}>
                ● {logs.filter(l => l.status === 'success').length} passed
              </span>
              <span style={{ color: '#ef4444' }}>
                ● {logs.filter(l => l.status === 'failed').length} failed
              </span>
              <span style={{ color: '#f59e0b' }}>
                ● {logs.filter(l => l.status === 'running').length} running
              </span>
            </div>
          )}
        </div>

        {/* ── Error State ────────────────────────────────────────────────── */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: '10px',
            padding: '14px 20px',
            color: '#f87171',
            fontSize: '13px',
            marginBottom: '20px',
          }}>
            ⚠ {error}
          </div>
        )}

        {/* ── Table ──────────────────────────────────────────────────────── */}
        <div style={{
          border: '1px solid #18181b',
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#09090b',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #18181b' }}>
                {['Status', 'Run ID', 'Started', 'Duration', 'Steps', ''].map((col) => (
                  <th key={col} style={{
                    padding: '10px 20px',
                    textAlign: 'left',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#52525b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    whiteSpace: 'nowrap',
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '60px 20px', textAlign: 'center', color: '#3f3f46', fontSize: '13px' }}>
                    <div style={{ marginBottom: '8px', fontSize: '24px' }}>⏱</div>
                    No execution logs yet. Run a workflow to see history here.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr
                    key={log._id}
                    onMouseEnter={() => setHoveredId(log._id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      borderBottom: '1px solid #18181b',
                      background: hoveredId === log._id ? '#0f0f11' : 'transparent',
                      transition: 'background 0.1s',
                    }}
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <StatusBadge status={log.status} />
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#71717a' }}>
                        {log._id.slice(-8)}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ fontSize: '13px', color: '#a1a1aa', whiteSpace: 'nowrap' }}>
                        {formatDate(log.startedAt)}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ fontSize: '13px', color: '#71717a', fontFamily: 'var(--font-mono)' }}>
                        {formatDuration(log.startedAt, log.completedAt)}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ fontSize: '13px', color: '#71717a' }}>
                        {log.steps.length}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <button
                        onClick={() => setSelected(log)}
                        style={{
                          padding: '5px 12px',
                          borderRadius: '6px',
                          border: '1px solid #27272a',
                          background: 'transparent',
                          color: '#71717a',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'border-color 0.15s, color 0.15s, background 0.15s',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = '#06b6d4';
                          el.style.color = '#06b6d4';
                          el.style.background = 'rgba(6,182,212,0.06)';
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = '#27272a';
                          el.style.color = '#71717a';
                          el.style.background = 'transparent';
                        }}
                      >
                        View Details →
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Slide-over ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <SlideOver log={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .json-key    { color: #7dd3fc; }
        .json-string { color: #86efac; }
        .json-number { color: #fcd34d; }
        .json-bool   { color: #f9a8d4; }
        .json-null   { color: #94a3b8; }
        pre::-webkit-scrollbar { width: 4px; height: 4px; }
        pre::-webkit-scrollbar-track { background: transparent; }
        pre::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }
      `}</style>
    </div>
  );
}
