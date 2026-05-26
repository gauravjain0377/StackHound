'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const API_CODE = `// Initialize StackHound
import { StackHound } from '@stackhound/sdk';

const sh = new StackHound({
  apiKey: process.env.SH_API_KEY,
});

// Enrich a company in one call
const result = await sh.enrich({
  url: 'https://acmecorp.com',
  depth: 3,
  signals: ['firmographic', 'technographic', 'intent'],
});

console.log(result.company);   // "Acme Corp"
console.log(result.employees); // 2400
console.log(result.techStack); // ["React", "Go", "AWS"]
console.log(result.score);     // 94`;

const RESPONSE_LINES = [
  { text: '{', indent: 0 },
  { text: '"status": "success",', indent: 1, keyColor: '#818cf8', valColor: '#4ade80' },
  { text: '"latency": "1.2s",', indent: 1, keyColor: '#818cf8', valColor: '#fbbf24' },
  { text: '"company": "Acme Corp",', indent: 1, keyColor: '#818cf8', valColor: '#06b6d4' },
  { text: '"employees": 2400,', indent: 1, keyColor: '#818cf8', valColor: '#f1f5f9' },
  { text: '"techStack": ["React","Go","AWS"],', indent: 1, keyColor: '#818cf8', valColor: '#06b6d4' },
  { text: '"score": 94', indent: 1, keyColor: '#818cf8', valColor: '#4ade80' },
  { text: '}', indent: 0 },
];

function TypingCode() {
  const [visibleLines, setVisibleLines] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    const lines = API_CODE.split('\n');
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= lines.length) clearInterval(timer);
    }, 80);
    return () => clearInterval(timer);
  }, [inView]);

  const lines = API_CODE.split('\n');
  const displayed = lines.slice(0, visibleLines);

  return (
    <div ref={ref} style={{
      fontFamily: 'monospace', fontSize: '12.5px', lineHeight: 1.85,
      color: 'rgba(255,255,255,0.6)',
      whiteSpace: 'pre',
      overflow: 'hidden',
    }}>
      {displayed.map((line, i) => {
        let colored = line;
        // Syntax highlight
        colored = line
          .replace(/(\/\/.*)/g, '<span style="color:rgba(255,255,255,0.2)">$1</span>')
          .replace(/(import|from|const|await|process)/g, '<span style="color:#c084fc">$1</span>')
          .replace(/('.*?'|".*?")/g, '<span style="color:#06b6d4">$1</span>')
          .replace(/(console\.log)/g, '<span style="color:#fbbf24">$1</span>')
          .replace(/(\d+)/g, '<span style="color:#4ade80">$1</span>');

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            style={{ display: 'flex', gap: '16px' }}
          >
            <span style={{ color: 'rgba(255,255,255,0.12)', minWidth: '20px', textAlign: 'right', userSelect: 'none' }}>
              {i + 1}
            </span>
            <span dangerouslySetInnerHTML={{ __html: colored }} />
          </motion.div>
        );
      })}
      {visibleLines < lines.length && (
        <span style={{
          display: 'inline-block', width: '8px', height: '16px',
          background: '#818cf8', marginLeft: '36px',
          animation: 'cursor-blink 1s steps(2) infinite',
        }} />
      )}
      <style>{`@keyframes cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}

function ResponsePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= RESPONSE_LINES.length) { clearInterval(timer); return prev; }
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} style={{
      fontFamily: 'monospace', fontSize: '12.5px', lineHeight: 2,
      padding: '20px', whiteSpace: 'pre',
    }}>
      {RESPONSE_LINES.slice(0, visibleLines).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          style={{ paddingLeft: `${line.indent * 16}px` }}
        >
          {line.keyColor ? (
            <>
              <span style={{ color: line.keyColor }}>{line.text.split(':')[0]}</span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span>
              <span style={{ color: line.valColor }}>{line.text.split(': ').slice(1).join(': ')}</span>
            </>
          ) : (
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>{line.text}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export function DeveloperSection() {
  return (
    <section style={{ padding: '120px 40px', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{
            fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: '#c084fc',
            background: 'rgba(192,132,252,0.1)', border: '1px solid rgba(192,132,252,0.25)',
            padding: '2px 9px', borderRadius: '20px',
          }}>For Developers</span>
          <h2 style={{
            marginTop: '16px',
            fontSize: 'clamp(32px, 4.5vw, 48px)',
            fontWeight: 300, color: '#fff',
            letterSpacing: '-0.04em', lineHeight: 1.15,
          }}>
            Ship in minutes.<br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>Not sprints.</span>
          </h2>
          <p style={{ marginTop: '12px', fontSize: '15px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, maxWidth: '460px', margin: '12px auto 0' }}>
            A clean TypeScript SDK that does the heavy lifting. Three lines to enrich. Zero config to deploy.
          </p>
        </motion.div>

        {/* Code + Response side-by-side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px', alignItems: 'start' }}>
          {/* Code editor */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: '#09090B',
              border: '1px solid #27272a',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            {/* Tab bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <div style={{
                padding: '10px 16px',
                fontSize: '11px', fontFamily: 'monospace',
                color: '#818cf8',
                borderBottom: '2px solid #818cf8',
                background: 'rgba(99,102,241,0.05)',
              }}>
                enrich.ts
              </div>
              <div style={{ padding: '10px 16px', fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)' }}>
                config.ts
              </div>
              <div style={{ padding: '10px 16px', fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)' }}>
                types.d.ts
              </div>
            </div>
            {/* Code content */}
            <div style={{ padding: '20px 0 20px 0', overflowX: 'auto' }}>
              <TypingCode />
            </div>
          </motion.div>

          {/* Response card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              background: '#09090B',
              border: '1px solid rgba(74,222,128,0.25)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.6)' }} />
                <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#4ade80' }}>200 OK</span>
              </div>
              <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)' }}>1.2s</span>
            </div>
            <ResponsePanel />
          </motion.div>
        </div>

        {/* SDK features */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '28px' }}>
          {[
            { icon: '⚡', label: 'TypeScript-first', desc: 'Full type safety' },
            { icon: '🔒', label: 'Auth built-in', desc: 'API keys & OAuth' },
            { icon: '📦', label: 'Tree-shakeable', desc: '< 8KB gzipped' },
            { icon: '🔄', label: 'Auto-retry', desc: 'Exponential backoff' },
          ].map((feat, i) => (
            <motion.div
              key={feat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: '#09090B',
                border: '1px solid #27272a',
                borderRadius: '14px',
                padding: '18px 20px',
                transition: 'border-color 200ms',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.3)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#27272a'}
            >
              <div style={{ fontSize: '18px', marginBottom: '8px' }}>{feat.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '2px' }}>{feat.label}</div>
              <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.3)' }}>{feat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
