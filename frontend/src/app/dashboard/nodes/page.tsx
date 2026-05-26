'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { NodeCard, type NodeCardData } from '@/components/NodeCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { fetchNodes, type NodeSummary } from '@/lib/api';

// ─── Catalogue ────────────────────────────────────────────────────────────────

const CATALOGUE: NodeCardData[] = [
  {
    id: 'core.log',
    name: 'Log Node',
    description: 'Logs a message to the console and returns a success result with an ISO timestamp.',
    type: 'Core',
    status: 'active',
    inputKeys: ['message'],
    outputKeys: ['success', 'logged', 'timestamp'],
  },
  {
    id: 'core.transform',
    name: 'Transform Node',
    description: 'Applies a typed transformation function to input data and returns the processed result.',
    type: 'Core',
    status: 'inactive',
    inputKeys: ['data', 'fn'],
    outputKeys: ['result', 'success'],
  },
  {
    id: 'core.filter',
    name: 'Filter Node',
    description: 'Filters an array of items against a predicate function and returns the matching subset.',
    type: 'Core',
    status: 'inactive',
    inputKeys: ['items', 'predicate'],
    outputKeys: ['filtered', 'count'],
  },
  {
    id: 'io.http',
    name: 'HTTP Request Node',
    description: 'Makes HTTP requests to external APIs and returns the parsed response body and status.',
    type: 'IO',
    status: 'inactive',
    inputKeys: ['url', 'method', 'headers', 'body'],
    outputKeys: ['status', 'body', 'headers'],
  },
  {
    id: 'ai.completion',
    name: 'AI Completion Node',
    description: 'Sends a prompt to a configured LLM and streams back the generated completion text.',
    type: 'AI',
    status: 'inactive',
    inputKeys: ['prompt', 'model', 'temperature'],
    outputKeys: ['completion', 'tokens', 'model'],
  },
  {
    id: 'data.postgres',
    name: 'Postgres Node',
    description: 'Executes a parameterised SQL query against a PostgreSQL database and returns rows.',
    type: 'Data',
    status: 'inactive',
    inputKeys: ['query', 'params'],
    outputKeys: ['rows', 'count'],
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ─── Skeleton Grid ────────────────────────────────────────────────────────────

function SkeletonGrid() {
  return (
    <div className="nodes-grid">
      {[1,2,3,4,5,6].map((i) => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '14px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton width="90px" height="20px" style={{ borderRadius: '4px' }} />
            <Skeleton width="40px" height="18px" style={{ borderRadius: '3px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Skeleton width="70%" height="14px" />
            <Skeleton width="100%" height="10px" />
            <Skeleton width="85%" height="10px" />
          </div>
          <Skeleton width="100%" height="1px" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Skeleton width="120px" height="9px" />
            <Skeleton width="90px"  height="9px" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Type Filter Pill ─────────────────────────────────────────────────────────

const TYPE_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  All:  { bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', border: 'rgba(255,255,255,0.1)' },
  Core: { bg: 'rgba(99,102,241,0.1)',   color: '#818cf8',               border: 'rgba(99,102,241,0.22)' },
  IO:   { bg: 'rgba(156,163,175,0.1)',  color: '#9ca3af',               border: 'rgba(156,163,175,0.2)' },
  AI:   { bg: 'rgba(96,165,250,0.1)',   color: '#93c5fd',               border: 'rgba(96,165,250,0.25)' },
  Data: { bg: 'rgba(52,211,153,0.1)',   color: '#6ee7b7',               border: 'rgba(52,211,153,0.25)' },
};

function TypePill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const c = TYPE_COLORS[label] ?? TYPE_COLORS.All;
  return (
    <button
      onClick={onClick}
      style={{
        padding: '5px 14px',
        borderRadius: '99px',
        fontSize: '12px',
        fontWeight: 600,
        cursor: 'pointer',
        border: `1px solid ${active ? c.border : 'rgba(255,255,255,0.07)'}`,
        background: active ? c.bg : 'transparent',
        color: active ? c.color : 'rgba(255,255,255,0.3)',
        transition: 'all 150ms ease',
        letterSpacing: '0.01em',
      }}
    >
      {label}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NodesPage() {
  const [query, setQuery]         = useState('');
  const [activeType, setActiveType] = useState('All');
  const [registeredIds, setRegistered] = useState<Set<string>>(new Set());
  const [apiStatus, setApiStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [liveNodes, setLiveNodes] = useState<NodeSummary[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetchNodes()
      .then((data) => {
        if (cancelled) return;
        setRegistered(new Set(data.nodes.map((n) => n.id)));
        setLiveNodes(data.nodes);
        setApiStatus('ok');
      })
      .catch(() => { if (!cancelled) setApiStatus('error'); });
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return CATALOGUE.filter((n) => {
      const matchesType = activeType === 'All' || n.type === activeType;
      const matchesQuery = !q ||
        n.name.toLowerCase().includes(q) ||
        n.id.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [query, activeType]);

  return (
    <>
      {/* ── Top Bar ──────────────────────────────────────────────────────── */}
      <header className="dashboard-topbar">
        <nav className="topbar-breadcrumb" aria-label="Breadcrumb">
          <span>StackHound</span>
          <span className="topbar-breadcrumb-sep">/</span>
          <span className="topbar-breadcrumb-current">Nodes</span>
        </nav>

        <div className="topbar-actions">
          {apiStatus === 'ok' && (
            <span className="nodes-count-chip">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 5px rgba(74,222,128,0.5)', display: 'inline-block' }} />
              {liveNodes.length} live
            </span>
          )}
          <button id="register-node-btn" className="btn-primary">
            + Register Node
          </button>
        </div>
      </header>

      {/* ── Scroll Area ──────────────────────────────────────────────────── */}
      <div className="dashboard-scroll-area">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* ── Header ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <h1 className="page-title">Node Playground</h1>
                <p className="page-subtitle" style={{ marginTop: '4px' }}>
                  Explore, inspect, and manage every node in your registry.
                </p>
              </div>

              {/* API status */}
              {apiStatus === 'loading' && (
                <Skeleton width="160px" height="32px" style={{ borderRadius: '8px' }} />
              )}
              {apiStatus === 'ok' && (
                <div className="api-status-strip">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Backend connected — <strong style={{ color: '#fff' }}>{liveNodes.length}</strong> registered</span>
                </div>
              )}
              {apiStatus === 'error' && (
                <div className="api-status-strip" style={{ color: '#f87171', borderColor: 'rgba(248,113,113,0.2)', background: 'rgba(248,113,113,0.05)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>Backend offline — showing catalogue only</span>
                </div>
              )}
            </div>

            {/* Search + Type filters */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="search-bar" role="search">
                <span className="search-bar-icon" aria-hidden="true"><IconSearch /></span>
                <input
                  id="nodes-search-input"
                  className="search-bar-input"
                  type="search"
                  placeholder="Search by name, ID, type, or description…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Filter nodes"
                />
                <span className="search-bar-count">{filtered.length}/{CATALOGUE.length}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {['All', 'Core', 'IO', 'AI', 'Data'].map((t) => (
                  <TypePill key={t} label={t} active={activeType === t} onClick={() => setActiveType(t)} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Grid ───────────────────────────────────────────────────── */}
          {apiStatus === 'loading' ? (
            <SkeletonGrid />
          ) : filtered.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '72px 0',
              gap: '12px',
              color: 'rgba(255,255,255,0.2)',
              fontSize: '14px',
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              No nodes match <strong style={{ color: 'rgba(255,255,255,0.5)', marginLeft: '4px' }}>&quot;{query}&quot;</strong>
            </div>
          ) : (
            <motion.div
              className="nodes-grid"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            >
              {filtered.map((node) => (
                <motion.div
                  key={node.id}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
                  }}
                >
                  <NodeCard
                    {...node}
                    isRegistered={registeredIds.has(node.id)}
                    status={registeredIds.has(node.id) ? 'active' : 'inactive'}
                    onClick={() => { console.info(`[NodeCard] Clicked: ${node.id}`); }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

        </div>
      </div>
    </>
  );
}
