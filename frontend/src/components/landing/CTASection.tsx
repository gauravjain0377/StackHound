'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function CTASection() {
  return (
    <section style={{ padding: '120px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 14px',
            background: 'rgba(6,182,212,0.07)',
            border: '1px solid rgba(6,182,212,0.18)',
            borderRadius: '99px',
            fontSize: '11px', fontWeight: 600,
            color: '#06b6d4',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            marginBottom: '28px',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 6px #06b6d4' }} />
            Free to start · No credit card
          </div>

          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 300,
            color: '#fff',
            letterSpacing: '-0.04em',
            lineHeight: 1.15,
            marginBottom: '16px',
          }}>
            Stop building spreadsheets.
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Start building empires.
            </span>
          </h2>

          <p style={{
            fontSize: '16px', color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.7, marginBottom: '40px',
          }}>
            Join 1,200+ high-growth teams automating their data pipelines with StackHound.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/sign-up" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                color: '#fff',
                borderRadius: '12px',
                fontWeight: 600, fontSize: '15px',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                boxShadow: '0 0 40px rgba(99,102,241,0.35)',
              }}>
                Start building free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <Link href="/dashboard" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '14px 24px',
              background: 'transparent',
              color: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              fontWeight: 500, fontSize: '14px',
              textDecoration: 'none',
              transition: 'color 150ms, border-color 150ms',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#fff';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
            }}
            >
              Open dashboard →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
