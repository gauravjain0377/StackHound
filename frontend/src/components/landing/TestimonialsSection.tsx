'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "StackHound replaced 3 tools and 2 full-time SDRs. Our pipeline velocity increased 4x in the first month.",
    name: 'Sarah Chen',
    role: 'VP Sales · Meridian AI',
    avatar: 'SC',
    color: '#6366f1',
    metric: '4x pipeline velocity',
  },
  {
    quote: "The enrichment accuracy is insane. We went from 60% data quality to 98% overnight. Our reps finally trust the CRM.",
    name: 'Marcus Rivera',
    role: 'RevOps Lead · Orbit Labs',
    avatar: 'MR',
    color: '#06b6d4',
    metric: '98% data accuracy',
  },
  {
    quote: "I built our entire lead scoring workflow in 20 minutes. No engineering tickets, no waiting. Just drag, drop, deploy.",
    name: 'Priya Patel',
    role: 'Growth Engineer · Synapse',
    avatar: 'PP',
    color: '#4ade80',
    metric: '20 min to deploy',
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ padding: '120px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
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
            textTransform: 'uppercase', color: '#818cf8',
            background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
            padding: '2px 9px', borderRadius: '20px',
          }}>Proof</span>
          <h2 style={{
            marginTop: '16px',
            fontSize: 'clamp(32px, 4.5vw, 48px)',
            fontWeight: 300, color: '#fff',
            letterSpacing: '-0.04em', lineHeight: 1.15,
          }}>
            Don't take our word for it.
          </h2>
        </motion.div>

        {/* Testimonial cards */}
        <div style={{ position: 'relative', minHeight: '260px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: '#09090B',
                border: '1px solid #27272a',
                borderRadius: '24px',
                padding: '40px 44px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, ${TESTIMONIALS[active].color}, transparent)`,
              }} />

              {/* Metric badge */}
              <div style={{
                position: 'absolute', top: '20px', right: '24px',
                padding: '5px 14px',
                background: `${TESTIMONIALS[active].color}12`,
                border: `1px solid ${TESTIMONIALS[active].color}30`,
                borderRadius: '20px',
                fontSize: '11px', fontWeight: 600,
                color: TESTIMONIALS[active].color,
              }}>
                {TESTIMONIALS[active].metric}
              </div>

              {/* Quote */}
              <div style={{ fontSize: '40px', color: 'rgba(255,255,255,0.06)', lineHeight: 1, marginBottom: '8px', fontFamily: 'serif' }}>"</div>
              <p style={{
                fontSize: '18px', color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.75, fontWeight: 400,
                letterSpacing: '-0.01em',
                maxWidth: '640px',
              }}>
                {TESTIMONIALS[active].quote}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '28px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: `${TESTIMONIALS[active].color}20`,
                  border: `1px solid ${TESTIMONIALS[active].color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700,
                  color: TESTIMONIALS[active].color,
                }}>
                  {TESTIMONIALS[active].avatar}
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{TESTIMONIALS[active].name}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{TESTIMONIALS[active].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '28px' }}>
          {TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? '32px' : '8px',
                height: '8px',
                borderRadius: '99px',
                background: active === i ? t.color : 'rgba(255,255,255,0.12)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 300ms ease',
                boxShadow: active === i ? `0 0 12px ${t.color}60` : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
