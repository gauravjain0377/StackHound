'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CODE_LINES = [
  { tokens: [{ t: '{', c: 'rgba(255,255,255,0.3)' }] },
  { tokens: [{ t: '  "url"', c: '#818cf8' }, { t: ': ', c: 'rgba(255,255,255,0.3)' }, { t: '"acmecorp.com"', c: '#06b6d4' }, { t: ',', c: 'rgba(255,255,255,0.3)' }] },
  { tokens: [{ t: '  "depth"', c: '#818cf8' }, { t: ': ', c: 'rgba(255,255,255,0.3)' }, { t: '3', c: '#fbbf24' }, { t: ',', c: 'rgba(255,255,255,0.3)' }] },
  { tokens: [{ t: '  "enrich"', c: '#818cf8' }, { t: ': ', c: 'rgba(255,255,255,0.3)' }, { t: 'true', c: '#4ade80' }, { t: ',', c: 'rgba(255,255,255,0.3)' }] },
  { tokens: [{ t: '  "output"', c: '#818cf8' }, { t: ': ', c: 'rgba(255,255,255,0.3)' }, { t: '"crm"', c: '#06b6d4' }] },
  { tokens: [{ t: '}', c: 'rgba(255,255,255,0.3)' }] },
];

const STEPS = [
  { title: 'Define your data source', desc: 'Configure the URL, crawl depth, and enrichment flags with a simple JSON payload.' },
  { title: 'StackHound processes in real-time', desc: 'Our autonomous AI engine scrapes, enriches, and validates every data point against live sources.' },
  { title: 'Enriched data flows to your stack', desc: 'Verified leads land directly in your CRM, Slack, or any connected endpoint — structured and ready.' },
];

export function ScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const step0Ref = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const pathLength = path.getTotalLength();
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: stickyRef.current,
        pinSpacing: false,
      },
    });

    // Draw the SVG path
    tl.to(path, { strokeDashoffset: 0, duration: 3, ease: 'none' });

    // Step text transitions
    const stepRefs = [step0Ref, step1Ref, step2Ref];
    stepRefs.forEach((ref, i) => {
      if (!ref.current) return;
      tl.to(ref.current, { opacity: 1, y: 0, duration: 0.4 }, i * 0.8);
      if (i < stepRefs.length - 1) {
        tl.to(ref.current, { opacity: 0, y: -10, duration: 0.25 }, i * 0.8 + 0.55);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      style={{ height: '300vh', position: 'relative' }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          overflow: 'hidden',
          padding: '0 40px',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '900px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1100px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 80px 1fr', alignItems: 'center', gap: '0' }}>

          {/* LEFT — Code block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              background: '#09090B',
              border: '1px solid #27272a',
              borderRadius: '16px',
              overflow: 'hidden',
            }}>
              {/* Terminal title bar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '12px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(255,255,255,0.02)',
              }}>
                {['#f87171', '#fbbf24', '#4ade80'].map(c => (
                  <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.8 }} />
                ))}
                <span style={{ marginLeft: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>
                  payload.json
                </span>
              </div>
              {/* Code lines */}
              <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: 2 }}>
                {CODE_LINES.map((line, li) => (
                  <motion.div
                    key={li}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + li * 0.07, duration: 0.4 }}
                    style={{ display: 'flex', flexWrap: 'wrap' }}
                  >
                    {line.tokens.map((tok, ti) => (
                      <span key={ti} style={{ color: tok.c }}>{tok.t}</span>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Step text — left */}
            <div style={{ marginTop: '28px', position: 'relative', height: '80px' }}>
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  ref={[step0Ref, step1Ref, step2Ref][i]}
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    opacity: i === 0 ? 1 : 0,
                    transform: i === 0 ? 'translateY(0)' : 'translateY(12px)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <div style={{
                      width: '22px', height: '22px',
                      borderRadius: '6px',
                      background: 'rgba(99,102,241,0.15)',
                      border: '1px solid rgba(99,102,241,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', fontWeight: 700, color: '#818cf8',
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{step.title}</span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, paddingLeft: '32px' }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CENTER — SVG path connector */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '280px' }}>
            <svg width="80" height="280" viewBox="0 0 80 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="pathGrad" x1="40" y1="0" x2="40" y2="280" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#4ade80" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {/* Static dashed guide */}
              <path d="M 40 0 C 40 50 40 100 40 140 C 40 180 40 230 40 280" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
              {/* Animated glow path */}
              <path
                ref={pathRef}
                d="M 40 0 C 40 50 40 100 40 140 C 40 180 40 230 40 280"
                stroke="url(#pathGrad)"
                strokeWidth="2"
                filter="url(#glow)"
                strokeLinecap="round"
              />
              {/* Endpoint dots */}
              <circle cx="40" cy="0" r="4" fill="#6366f1" />
              <circle cx="40" cy="280" r="4" fill="#4ade80" />
            </svg>
          </div>

          {/* RIGHT — Output node card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div style={{
              background: '#09090B',
              border: '1px solid rgba(74,222,128,0.3)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 0 40px rgba(74,222,128,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#4ade80', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Output Node
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.8)', animation: 'status-pulse 2s infinite' }} />
                  <span style={{ fontSize: '11px', color: '#4ade80' }}>Live</span>
                </div>
              </div>

              {/* Output fields */}
              {[
                { label: 'Company', value: 'Acme Corp', color: '#fff' },
                { label: 'CEO', value: 'John Park', color: '#fff' },
                { label: 'ARR', value: '$14.2M', color: '#4ade80' },
                { label: 'Tech Stack', value: 'React · Go · AWS', color: '#818cf8' },
                { label: 'Intent Score', value: '94 / 100', color: '#06b6d4' },
              ].map((field, i) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{field.label}</span>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: field.color, fontFamily: 'monospace' }}>{field.value}</span>
                </motion.div>
              ))}

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                {['→ Salesforce', '→ Slack', '→ CSV'].map(btn => (
                  <div key={btn} style={{
                    flex: 1, padding: '7px', textAlign: 'center',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '8px',
                    fontSize: '10px', color: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                  }}>
                    {btn}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section label */}
        <div style={{ position: 'absolute', top: '48px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            How it works
          </span>
        </div>
      </div>
    </section>
  );
}
