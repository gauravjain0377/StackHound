'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// ─── Icon Map ─────────────────────────────────────────────────────────────────

const ICON_SVG: Record<string, React.ReactNode> = {
  search: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  mail: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  chart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  target: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  globe: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  zap: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  default: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface RecipeCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RecipeCard({ id, title, description, icon }: RecipeCardProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const iconEl = ICON_SVG[icon] ?? ICON_SVG.default;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        borderColor: hovered ? '#06b6d4' : '#27272a',
        boxShadow: hovered
          ? '0 0 0 1px #06b6d4, 0 8px 32px rgba(6,182,212,0.15)'
          : '0 0 0 0px transparent, 0 0px 0px transparent',
      }}
      transition={{ duration: 0.2 }}
      style={{
        backgroundColor: '#18181B',
        border: '1px solid #27272a',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '200px',
      }}
    >
      {/* Subtle cyan glow top-left on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle at 0 0, rgba(6,182,212,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(99,102,241,0.15) 100%)',
          border: '1px solid rgba(6,182,212,0.2)',
          color: '#06b6d4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          flexShrink: 0,
        }}
      >
        {iconEl}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '15px',
          fontWeight: 600,
          color: '#f4f4f5',
          margin: '0 0 8px 0',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '13px',
          color: '#71717a',
          margin: 0,
          lineHeight: 1.6,
          flexGrow: 1,
        }}
      >
        {description}
      </p>

      {/* Use Template button — fades in on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            onClick={() => router.push(`/dashboard/workflow?recipeId=${id}`)}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(6,182,212,0.4)',
              background: 'rgba(6,182,212,0.08)',
              color: '#06b6d4',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              width: 'fit-content',
              letterSpacing: '-0.01em',
            }}
          >
            Use Template
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
