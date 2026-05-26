'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FLOW_STEPS = [
  {
    title: '1. Ingest Any Source',
    desc: 'Paste a URL, send a webhook payload, or connect a CRM. StackHound intercepts the raw unstructured data the moment it drops.',
  },
  {
    title: '2. Autonomous Crawling',
    desc: 'Our engine spins up headless browsers, bypassing anti-bot measures to traverse the domain structure and gather deep context.',
  },
  {
    title: '3. LLM Extraction',
    desc: 'Raw HTML and text are fed into our specialized AI layer, stripping noise and hallucination-checking against your exact schema.',
  },
  {
    title: '4. Structured Output',
    desc: 'The messy web is transformed into clean, strongly-typed JSON and instantly routed to your database, Slack, or thousands of APIs.',
  },
];

export function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  
  // Text refs
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // UI Panels refs
  const ui1Ref = useRef<HTMLDivElement>(null);
  const ui2Ref = useRef<HTMLDivElement>(null);
  const ui3Ref = useRef<HTMLDivElement>(null);
  const ui4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Create the massive scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: stickyRef.current,
        },
      });

      // We have 4 steps. 
      // Timeline progresses from 0 to 4.
      
      // Step 1 -> 2
      tl.to(textRefs.current[0], { opacity: 0, y: -20, duration: 0.2 }, 0.5)
        .to(ui1Ref.current, { opacity: 0, scale: 0.95, duration: 0.2 }, 0.5)
        
        .fromTo(textRefs.current[1], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, 0.6)
        .fromTo(ui2Ref.current, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.2 }, 0.6);

      // Step 2 -> 3
      tl.to(textRefs.current[1], { opacity: 0, y: -20, duration: 0.2 }, 1.5)
        .to(ui2Ref.current, { opacity: 0, scale: 0.95, duration: 0.2 }, 1.5)
        
        .fromTo(textRefs.current[2], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, 1.6)
        .fromTo(ui3Ref.current, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.2 }, 1.6);

      // Step 3 -> 4
      tl.to(textRefs.current[2], { opacity: 0, y: -20, duration: 0.2 }, 2.5)
        .to(ui3Ref.current, { opacity: 0, scale: 0.95, duration: 0.2 }, 2.5)
        
        .fromTo(textRefs.current[3], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, 2.6)
        .fromTo(ui4Ref.current, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.2 }, 2.6);

      // Pad the end so the user can read the last step before unpinning
      tl.to({}, { duration: 0.4 });
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      style={{ height: '400vh', position: 'relative', background: '#000' }}
    >
      <div
        ref={stickyRef}
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '0 40px',
        }}
      >
        {/* Deep background mesh glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '1000px', height: '1000px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '1200px', width: '100%', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '80px',
          alignItems: 'center',
        }}>
          
          {/* LEFT: Text Explanations */}
          <div style={{ position: 'relative', height: '300px' }}>
            <div style={{ position: 'absolute', top: '-60px' }}>
              <span style={{ fontSize: '11px', color: '#818cf8', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                How It Works
              </span>
            </div>
            
            {FLOW_STEPS.map((step, i) => (
              <div
                key={i}
                ref={el => { textRefs.current[i] = el; }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  opacity: i === 0 ? 1 : 0,
                  transform: i === 0 ? 'translateY(0)' : 'translateY(20px)',
                  width: '100%',
                }}
              >
                <h3 style={{
                  fontSize: 'clamp(32px, 4vw, 42px)',
                  fontWeight: 300, color: '#fff',
                  lineHeight: 1.1, letterSpacing: '-0.04em',
                  marginBottom: '20px',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '16px', color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.7,
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT: Visual UI Frames */}
          <div style={{ position: 'relative', height: '500px', width: '100%' }}>
            
            {/* UI Step 1: Input URL */}
            <div
              ref={ui1Ref}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 1, zIndex: 4,
              }}
            >
              <div style={{
                background: '#09090B',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '40px',
                width: '100%', maxWidth: '500px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              }}>
                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                  </div>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Target Endpoint</span>
                </div>
                <div style={{
                  background: '#000', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center',
                  position: 'relative', overflow: 'hidden'
                }}>
                  <span style={{ fontSize: '14px', fontFamily: 'monospace', color: '#fff' }}>https://meridian-ai.io/about</span>
                  {/* Blinking cursor */}
                  <span style={{ width: '2px', height: '16px', background: '#fff', marginLeft: '4px', animation: 'blink 1s infinite' }} />
                </div>
                <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
              </div>
            </div>

            {/* UI Step 2: Crawling Graph */}
            <div
              ref={ui2Ref}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, zIndex: 3, pointerEvents: 'none',
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 600 500" fill="none">
                <defs>
                  <linearGradient id="crawlGrad" x1="300" y1="50" x2="300" y2="400" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="rgba(99,102,241,0.5)" />
                    <stop offset="100%" stopColor="rgba(6,182,212,0.1)" />
                  </linearGradient>
                </defs>
                {/* Central node */}
                <circle cx="300" cy="80" r="24" fill="#09090B" stroke="#818cf8" strokeWidth="2" />
                <circle cx="300" cy="80" r="8" fill="#818cf8" />
                
                {/* Branches */}
                {[ 
                  {x: 150, y: 220}, {x: 250, y: 250}, {x: 350, y: 240}, {x: 450, y: 210}
                ].map((pos, i) => (
                  <g key={i}>
                    <path d={`M 300 104 C 300 150 ${pos.x} 150 ${pos.x} ${pos.y - 20}`} stroke="url(#crawlGrad)" strokeWidth="1.5" />
                    <rect x={pos.x - 40} y={pos.y - 20} width="80" height="40" rx="8" fill="#09090B" stroke="rgba(255,255,255,0.1)" />
                    <text x={pos.x} y={pos.y + 4} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">/page-{i+1}</text>
                  </g>
                ))}
                
                {/* Deeper branches */}
                <path d="M 150 240 C 150 300 100 300 100 350" stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                <rect x="70" y="350" width="60" height="30" rx="6" fill="#09090B" stroke="rgba(255,255,255,0.05)" />
                <path d="M 350 260 C 350 300 400 300 400 340" stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                <rect x="370" y="340" width="60" height="30" rx="6" fill="#09090B" stroke="rgba(255,255,255,0.05)" />
                
                {/* Scanner beam */}
                <path d="M 300 104 L 100 350 L 400 340 Z" fill="rgba(99,102,241,0.02)" />
              </svg>
            </div>

            {/* UI Step 3: AI Extraction Pane */}
            <div
              ref={ui3Ref}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, zIndex: 2, pointerEvents: 'none',
              }}
            >
               <div style={{
                  display: 'flex', width: '100%', height: '360px',
                  background: '#09090B', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px', overflow: 'hidden',
               }}>
                  {/* Left: Raw HTML */}
                  <div style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.05)', padding: '20px', overflow: 'hidden' }}>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', marginBottom: '12px', textTransform: 'uppercase' }}>Raw DOM</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.15)', lineHeight: 1.6, whiteSpace: 'pre' }}>
                      {`<div class="about-container">\n  <h1>Meridian AI</h1>\n  <p>Founded: 2021</p>\n  <span class="funding">Series A: $12M</span>\n  <ul class="stack">\n    <li>Next.js</li>\n    <li>Python</li>\n  </ul>\n</div>`}
                    </div>
                  </div>
                  {/* Right: Extracted JSON */}
                  <div style={{ flex: 1, padding: '20px', background: 'rgba(6,182,212,0.02)' }}>
                    <div style={{ fontSize: '10px', color: '#06b6d4', marginBottom: '12px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '4px', height: '4px', background: '#06b6d4', borderRadius: '50%' }} />
                      Extracted JSON
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#fff', lineHeight: 1.8, whiteSpace: 'pre' }}>
                      <span style={{ color: 'rgba(255,255,255,0.3)' }}>{`{\n`}</span>
                      <span style={{ color: '#818cf8' }}>{`  "company"`}</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span><span style={{ color: '#06b6d4' }}>{`"Meridian AI"`}</span>{`,\n`}
                      <span style={{ color: '#818cf8' }}>{`  "founded"`}</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span><span style={{ color: '#4ade80' }}>{`2021`}</span>{`,\n`}
                      <span style={{ color: '#818cf8' }}>{`  "funding"`}</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span><span style={{ color: '#06b6d4' }}>{`"$12,000,000"`}</span>{`,\n`}
                      <span style={{ color: '#818cf8' }}>{`  "stack"`}</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span><span style={{ color: 'rgba(255,255,255,0.3)' }}>{`[\n    `}</span><span style={{ color: '#06b6d4' }}>{`"Next.js"`}</span>{`,\n    `}<span style={{ color: '#06b6d4' }}>{`"Python"`}</span>{`\n  `}<span style={{ color: 'rgba(255,255,255,0.3)' }}>{`]\n`}</span>
                      <span style={{ color: 'rgba(255,255,255,0.3)' }}>{`}`}</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* UI Step 4: Outgoing payload */}
            <div
              ref={ui4Ref}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, zIndex: 1, pointerEvents: 'none',
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  padding: '24px', background: '#09090B', border: '1px solid rgba(74,222,128,0.3)',
                  borderRadius: '16px', boxShadow: '0 0 50px rgba(74,222,128,0.1)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10
                }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(74,222,128,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>Pipeline Succeeded</h4>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>200 OK — Payload delivered to Salesforce</p>
                </div>
                
                {/* Outgoing particles */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}>
                   <circle cx="50%" cy="50%" r="4" fill="#4ade80">
                      <animate attributeName="opacity" values="1;0" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="r" values="4;40" dur="1.5s" repeatCount="indefinite" />
                   </circle>
                </svg>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
