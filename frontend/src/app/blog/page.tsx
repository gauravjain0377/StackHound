'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { blogPosts } from './data';

const Icons = {
  logo: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="white">
      <rect x="1" y="1" width="6" height="6" rx="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
    </svg>
  ),
};

export default function BlogListingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{ padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {Icons.logo}
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>StackHound</span>
        </Link>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}>Home</Link>
          <Link href="/dashboard" style={{
            background: '#fff', color: '#000', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.2s'
          }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>Dashboard</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ padding: '80px 40px 40px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '48px', fontWeight: 800, marginBottom: '16px', background: 'linear-gradient(to right, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.03em' }}
        >
          Insights & Updates
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: '18px', color: '#a1a1aa', lineHeight: 1.6 }}
        >
          Thoughts on AI-powered sales intelligence, the future of web scraping, and building autonomous B2B engines.
        </motion.p>
      </div>

      {/* Grid */}
      <main style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', flex: 1, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#09090b', border: '1px solid #27272a', borderRadius: '16px', padding: '32px',
                  height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(99,102,241,0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#27272a';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#818cf8', background: 'rgba(99,102,241,0.1)', padding: '4px 10px', borderRadius: '99px' }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '13px', color: '#71717a' }}>{post.readingTime}</span>
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '12px', lineHeight: 1.3 }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: '15px', color: '#a1a1aa', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #3f3f46, #18181b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: '#fff' }}>
                      SH
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: '#e4e4e7' }}>StackHound Team</div>
                      <div style={{ fontSize: '12px', color: '#71717a' }}>{post.date}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#71717a', fontSize: '14px' }}>
        &copy; {new Date().getFullYear()} StackHound Inc. All rights reserved.
      </footer>
    </div>
  );
}
