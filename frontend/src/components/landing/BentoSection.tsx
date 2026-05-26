'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Mini React Flow diagram SVG ───────────────────────────────────────────────
function FlowDiagram() {
  return (
    <svg width="100%" height="160" viewBox="0 0 380 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Connection lines */}
      <path d="M 90 80 C 130 80 150 40 190 40" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M 90 80 C 130 80 150 80 190 80" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" />
      <path d="M 90 80 C 130 80 150 120 190 120" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M 250 40 C 270 40 290 80 310 80" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" />
      <path d="M 250 80 C 270 80 290 80 310 80" stroke="rgba(99,102,241,0.6)" strokeWidth="1.5" />
      <path d="M 250 120 C 270 120 290 80 310 80" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" />

      {/* Animated particle on main path */}
      <circle r="3" fill="#06b6d4">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 90 80 C 130 80 150 80 190 80" />
      </circle>
      <circle r="3" fill="#6366f1">
        <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s" path="M 250 80 C 270 80 290 80 310 80" />
      </circle>

      {/* Source node */}
      <rect x="20" y="56" width="70" height="48" rx="10" fill="#18181B" stroke="#27272a" strokeWidth="1" />
      <rect x="20" y="56" width="70" height="3" rx="10" fill="#eab308" />
      <text x="55" y="78" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="monospace">Trigger</text>
      <text x="55" y="92" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8">Webhook</text>

      {/* Middle nodes */}
      {[{ y: 20, color: '#06b6d4', label: 'Scraper', sub: 'URL' },
        { y: 60, color: '#6366f1', label: 'AI Enrich', sub: 'GPT-4o' },
        { y: 100, color: '#10b981', label: 'Filter', sub: 'Rules' }].map((n, i) => (
        <g key={i}>
          <rect x="175" y={n.y} width="75" height="40" rx="8" fill="#18181B" stroke="#27272a" strokeWidth="1" />
          <rect x="175" y={n.y} width="75" height="2.5" rx="8" fill={n.color} />
          <text x="212" y={n.y + 16} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="monospace">{n.label}</text>
          <text x="212" y={n.y + 28} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8">{n.sub}</text>
        </g>
      ))}

      {/* Output node */}
      <rect x="296" y="56" width="70" height="48" rx="10" fill="#18181B" stroke="rgba(99,102,241,0.5)" strokeWidth="1" />
      <rect x="296" y="56" width="70" height="3" rx="10" fill="#6366f1" />
      <text x="331" y="78" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="monospace">Output</text>
      <text x="331" y="92" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8">CRM Sync</text>
    </svg>
  );
}

// ── JSON verification display ─────────────────────────────────────────────────
function JSONVerify() {
  const lines = [
    { key: '"company"', val: '"Acme Corp"', verified: true },
    { key: '"employees"', val: '2400', verified: true },
    { key: '"tech_stack"', val: '["React","Go"]', verified: true },
    { key: '"score"', val: '94', verified: false },
  ];
  return (
    <div style={{
      fontFamily: 'monospace', fontSize: '11px', lineHeight: 1.9,
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '10px',
      padding: '14px 16px',
      marginTop: '12px',
    }}>
      <div style={{ color: 'rgba(255,255,255,0.25)', marginBottom: '4px' }}>{'{'}</div>
      {lines.map((l, i) => (
        <motion.div
          key={l.key}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.12, duration: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '12px' }}
        >
          <span style={{ color: '#818cf8' }}>{l.key}</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>:</span>
          <span style={{ color: '#06b6d4' }}>{l.val}</span>
          {l.verified && (
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 300 }}
              style={{ color: '#4ade80', marginLeft: 'auto' }}
            >
              ✓
            </motion.span>
          )}
        </motion.div>
      ))}
      <div style={{ color: 'rgba(255,255,255,0.25)' }}>{'}'}</div>
    </div>
  );
}

// ── URL Enrichment bar ────────────────────────────────────────────────────────
function EnrichBar() {
  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        background: '#18181B',
        border: '1px solid rgba(6,182,212,0.35)',
        borderRadius: '10px',
        padding: '10px 14px',
        boxShadow: '0 0 20px rgba(6,182,212,0.08)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 8px #06b6d4', flexShrink: 0 }} />
        <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.55)' }}>
          linkedin.com/company/acme-corp
        </span>
        {/* Shimmer */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.07) 50%, transparent 100%)',
          animation: 'shimmer 2.5s ease-in-out infinite',
        }} />
        <style>{`@keyframes shimmer { 0%,100%{transform:translateX(-100%)} 50%{transform:translateX(100%)} }`}</style>
      </div>
      <div style={{ marginTop: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {['CEO: John Park', 'ARR: $14M', 'Series B', 'Hiring'].map(tag => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, type: 'spring' }}
            style={{
              fontSize: '10px', fontWeight: 600,
              color: '#06b6d4',
              background: 'rgba(6,182,212,0.07)',
              border: '1px solid rgba(6,182,212,0.2)',
              padding: '3px 10px',
              borderRadius: '20px',
              letterSpacing: '0.03em',
            }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

// ── Bento card wrapper ────────────────────────────────────────────────────────
function BentoCard({
  children, style = {}, className = '', index = 0,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      style={{
        background: '#09090B',
        border: '1px solid #27272a',
        borderRadius: '24px',
        padding: '28px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'border-color 250ms, box-shadow 250ms',
        ...style,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.35)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(99,102,241,0.08), 0 20px 60px rgba(0,0,0,0.6)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = '#27272a';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {children}
    </motion.div>
  );
}

function Tag({ color, label }: { color: string; label: string }) {
  return (
    <span style={{
      fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color, background: `${color}14`,
      border: `1px solid ${color}33`,
      padding: '2px 9px', borderRadius: '20px',
      display: 'inline-block',
    }}>{label}</span>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export function BentoSection() {
  return (
    <section id="features" style={{ padding: '120px 40px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        <Tag color="#818cf8" label="Features" />
        <h2 style={{
          marginTop: '16px',
          fontSize: 'clamp(32px, 4.5vw, 52px)',
          fontWeight: 300,
          color: '#fff',
          letterSpacing: '-0.04em',
          lineHeight: 1.15,
        }}>
          Built different.<br />
          <span style={{
            background: 'linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Engineered to dominate.</span>
        </h2>
        <p style={{ marginTop: '14px', fontSize: '15px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, maxWidth: '500px', margin: '14px auto 0' }}>
          Each component is precision-crafted to eliminate busywork and amplify your team's output.
        </p>
      </motion.div>

      {/* Bento grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'auto auto auto',
        gap: '16px',
      }}>
        {/* Card 1 — Large: Visual Automation Engine */}
        <BentoCard index={0} style={{ gridColumn: 'span 2' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #6366f1, #06b6d4)' }} />
          <Tag color="#818cf8" label="Core" />
          <h3 style={{ marginTop: '14px', fontSize: '22px', fontWeight: 600, color: '#fff', letterSpacing: '-0.025em' }}>
            Visual Automation Engine
          </h3>
          <p style={{ marginTop: '6px', fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.65 }}>
            Connect data sources, AI models, and CRMs with a drag-and-drop canvas. No code required.
          </p>
          <div style={{ marginTop: '20px' }}>
            <FlowDiagram />
          </div>
        </BentoCard>

        {/* Card 2 — Zero Hallucinations */}
        <BentoCard index={1}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #4ade80, #06b6d4)' }} />
          <Tag color="#4ade80" label="Accuracy" />
          <h3 style={{ marginTop: '14px', fontSize: '19px', fontWeight: 600, color: '#fff', letterSpacing: '-0.025em' }}>
            Zero Hallucinations
          </h3>
          <p style={{ marginTop: '6px', fontSize: '12.5px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.65 }}>
            Every AI output is verified against live data sources before it hits your CRM.
          </p>
          <JSONVerify />
        </BentoCard>

        {/* Card 3 — One-Click Enrichment */}
        <BentoCard index={2}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #06b6d4, #818cf8)' }} />
          <Tag color="#06b6d4" label="Enrichment" />
          <h3 style={{ marginTop: '14px', fontSize: '19px', fontWeight: 600, color: '#fff', letterSpacing: '-0.025em' }}>
            One-Click Enrichment
          </h3>
          <p style={{ marginTop: '6px', fontSize: '12.5px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.65 }}>
            Drop any URL. Get firmographics, technographics, and buying signals instantly.
          </p>
          <EnrichBar />
        </BentoCard>

        {/* Card 4 — Real-time intelligence (full width) */}
        <BentoCard index={3} style={{ gridColumn: 'span 3' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #6366f1, #818cf8, #06b6d4, #6366f1)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ maxWidth: '400px' }}>
              <Tag color="#fbbf24" label="Enterprise" />
              <h3 style={{ marginTop: '14px', fontSize: '22px', fontWeight: 600, color: '#fff', letterSpacing: '-0.025em' }}>
                Production-Grade Infrastructure
              </h3>
              <p style={{ marginTop: '6px', fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.65 }}>
                SOC 2 Type II, 99.9% uptime SLA, private cloud deployments, and audit logs for every data touch.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { label: 'SOC 2 Type II', color: '#4ade80' },
                { label: '99.9% Uptime', color: '#818cf8' },
                { label: 'GDPR Ready', color: '#06b6d4' },
                { label: 'Private Cloud', color: '#fbbf24' },
                { label: 'Audit Logs', color: '#f87171' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.4, type: 'spring' }}
                  style={{
                    padding: '10px 18px',
                    background: `${item.color}0a`,
                    border: `1px solid ${item.color}25`,
                    borderRadius: '10px',
                    fontSize: '12px', fontWeight: 600,
                    color: item.color,
                    letterSpacing: '0.02em',
                  }}
                >
                  {item.label}
                </motion.div>
              ))}
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
