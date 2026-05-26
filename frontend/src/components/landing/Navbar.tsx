'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Docs', href: '/docs', external: true },
  { label: 'Blog', href: '/blog', external: true },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
        transition: 'background 350ms ease, border-color 350ms ease, backdrop-filter 350ms ease',
        background: scrolled ? 'rgba(0,0,0,0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
        <div style={{
          width: '28px', height: '28px',
          background: 'linear-gradient(135deg, #6366f1, #818cf8)',
          borderRadius: '7px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(99,102,241,0.5)',
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
            <rect x="1" y="1" width="6" height="6" rx="1.5" />
            <rect x="9" y="1" width="6" height="6" rx="1.5" />
            <rect x="1" y="9" width="6" height="6" rx="1.5" />
            <rect x="9" y="9" width="6" height="6" rx="1.5" />
          </svg>
        </div>
        <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>StackHound</span>
      </Link>

      {/* Nav links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '0 auto' }}>
        {NAV_LINKS.map((link) => (
          <Link key={link.label} href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            style={{
            padding: '6px 14px',
            fontSize: '13.5px',
            fontWeight: 450,
            color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none',
            borderRadius: '8px',
            transition: 'color 150ms, background 150ms',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = '#fff';
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
            (e.currentTarget as HTMLElement).style.background = 'transparent';
          }}
          >
            {link.label}
            {link.external && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            )}
          </Link>
        ))}
      </nav>

      {/* CTAs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        {isSignedIn ? (
          <Link href="/dashboard" style={{
            padding: '7px 18px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#000',
            background: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            transition: 'background 150ms, box-shadow 150ms',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.9)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(255,255,255,0.2)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = '#fff';
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link href="/sign-in" style={{
              padding: '7px 16px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'color 150ms',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
            >
              Sign in
            </Link>
            <Link href="/sign-up" style={{
              padding: '7px 18px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#000',
              background: '#fff',
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'background 150ms, box-shadow 150ms',
              letterSpacing: '-0.01em',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.9)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(255,255,255,0.2)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#fff';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
            >
              Get started
            </Link>
          </>
        )}
      </div>
    </motion.header>
  );
}
