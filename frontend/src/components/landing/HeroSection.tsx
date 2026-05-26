'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ── Interactive Dot Grid ──────────────────────────────────────────────────────
function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const SPACING = 32;
    const BASE_R = 1;
    const RANGE = 180;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / SPACING) + 1;
      const rows = Math.ceil(canvas.height / SPACING) + 1;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;
          const d = Math.hypot(x - mx, y - my);
          const t = Math.max(0, 1 - d / RANGE);
          // smoothstep
          const eased = t * t * (3 - 2 * t);
          const radius = BASE_R + eased * 2.8;

          let rc = 255, gc = 255, bc = 255;
          let alpha = 0.055;

          if (eased > 0.01) {
            if (eased > 0.55) {
              rc = 99; gc = 102; bc = 241; // indigo
              alpha = 0.1 + eased * 0.65;
            } else if (eased > 0.2) {
              rc = 6; gc = 182; bc = 212; // cyan
              alpha = 0.09 + eased * 0.4;
            } else {
              alpha = 0.055 + eased * 0.25;
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rc},${gc},${bc},${alpha})`;
          ctx.fill();
        }
      }
      raf.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.85 }}
    />
  );
}

// ── Marquee logos ─────────────────────────────────────────────────────────────
const COMPANIES = ['Acme Corp', 'Meridian AI', 'Pulse HQ', 'Orbit Labs', 'Synapse', 'Halo Systems', 'Vex Ventures', 'Nomad Co', 'Apex Data'];

function Marquee() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: '100%', marginTop: '60px' }}>
      {/* Fade masks */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(90deg, #000 0%, transparent 15%, transparent 85%, #000 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{ display: 'flex', gap: '0', overflow: 'hidden' }}>
        {[0, 1].map(key => (
          <div key={key} style={{
            display: 'flex', alignItems: 'center', gap: '48px',
            animation: 'marquee-scroll 28s linear infinite',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            {COMPANIES.map(c => (
              <span key={c} style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.18)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ── Magnetic Button ───────────────────────────────────────────────────────────
function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        padding: '14px 30px',
        background: 'rgba(6,182,212,0.06)',
        border: '1px solid rgba(6,182,212,0.4)',
        borderRadius: '12px',
        color: '#06b6d4',
        fontWeight: 600, fontSize: '15px',
        textDecoration: 'none',
        transition: 'transform 0.15s ease, background 200ms, border-color 200ms, box-shadow 200ms',
        letterSpacing: '-0.01em',
        boxShadow: '0 0 0 0 rgba(6,182,212,0)',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.background = 'rgba(6,182,212,0.12)';
        el.style.borderColor = 'rgba(6,182,212,0.7)';
        el.style.boxShadow = '0 0 30px rgba(6,182,212,0.25), inset 0 0 20px rgba(6,182,212,0.05)';
      }}
      onMouseOut={e => {
        const el = e.currentTarget;
        el.style.background = 'rgba(6,182,212,0.06)';
        el.style.borderColor = 'rgba(6,182,212,0.4)';
        el.style.boxShadow = '0 0 0 0 rgba(6,182,212,0)';
      }}
    >
      {children}
    </a>
  );
}

// ── Word-by-word headline animation ───────────────────────────────────────────
function AnimatedHeadline({ text, gradient }: { text: string; gradient?: boolean }) {
  const words = text.split(' ');
  return (
    <span aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-block',
            marginRight: '0.28em',
            ...(gradient ? {
              background: 'linear-gradient(135deg, #ffffff 30%, rgba(255,255,255,0.35) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            } : {}),
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: '#000',
      padding: '0 24px',
    }}>
      {/* Dot grid */}
      <DotGrid />

      {/* Aurora blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '15%', left: '15%',
          width: '600px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.09) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'blob1 14s ease-in-out infinite',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '10%',
          width: '500px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'blob2 18s ease-in-out infinite',
          filter: 'blur(50px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '35%',
          width: '400px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'blob3 22s ease-in-out infinite',
          filter: 'blur(60px)',
        }} />
      </div>

      <style>{`
        @keyframes blob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(40px,-30px) scale(1.08); }
          66% { transform: translate(-20px,20px) scale(0.95); }
        }
        @keyframes blob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40% { transform: translate(-50px,30px) scale(1.1); }
          70% { transform: translate(30px,-15px) scale(0.92); }
        }
        @keyframes blob3 {
          0%,100% { transform: translate(0,0) scale(1); }
          30% { transform: translate(25px,-40px) scale(1.06); }
          60% { transform: translate(-35px,25px) scale(0.96); }
        }
      `}</style>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
        maxWidth: '860px', width: '100%',
        paddingTop: '80px',
      }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px',
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: '99px',
            fontSize: '12px', fontWeight: 600,
            color: '#818cf8',
            letterSpacing: '0.05em',
            marginBottom: '36px',
          }}
        >
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#818cf8',
            boxShadow: '0 0 8px rgba(129,140,248,0.8)',
            animation: 'status-pulse 2s ease-in-out infinite',
          }} />
          Public Beta · Join 1,200+ teams
        </motion.div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(48px, 8vw, 88px)',
          fontWeight: 300,
          lineHeight: 1.08,
          letterSpacing: '-0.045em',
          marginBottom: '24px',
          perspective: '800px',
        }}>
          <AnimatedHeadline text="Automate your data." gradient />
          <br />
          <AnimatedHeadline text="Unchain your sales." />
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: '17px',
            color: 'rgba(255,255,255,0.38)',
            lineHeight: 1.75,
            maxWidth: '520px',
            marginBottom: '44px',
          }}
        >
          StackHound autonomously scrapes, enriches, and routes your prospect data —
          so your team can close instead of copy-paste.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <MagneticButton href="/sign-up">
            Start Building
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>

          <motion.a
            href="/dashboard"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 26px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 500, fontSize: '15px',
              textDecoration: 'none',
              transition: 'background 200ms, border-color 200ms, color 200ms',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.background = 'rgba(255,255,255,0.07)';
              el.style.borderColor = 'rgba(255,255,255,0.18)';
              el.style.color = '#fff';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.background = 'rgba(255,255,255,0.04)';
              el.style.borderColor = 'rgba(255,255,255,0.1)';
              el.style.color = 'rgba(255,255,255,0.6)';
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            See it live
          </motion.a>
        </motion.div>

        {/* Social proof marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          style={{ width: '100%', marginTop: '64px' }}
        >
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>
            Trusted by fast-moving teams at
          </p>
          <Marquee />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
        background: 'linear-gradient(to top, #000 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 5,
      }} />
    </section>
  );
}
