'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { blogPosts } from '../data';

const Icons = {
  logo: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="white">
      <rect x="1" y="1" width="6" height="6" rx="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
    </svg>
  ),
  arrowLeft: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  )
};

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  
  const slug = params.slug as string;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff', flexDirection: 'column', gap: '20px' }}>
        <h2>Post not found</h2>
        <Link href="/blog" style={{ color: '#818cf8', textDecoration: 'none' }}>Return to blog</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', zIndex: 10 }}>
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
        <Link href="/blog" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}>
          {Icons.arrowLeft} Back to Blog
        </Link>
      </nav>

      {/* Article Content */}
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 20px', width: '100%' }}>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <header style={{ marginBottom: '48px', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#818cf8', background: 'rgba(99,102,241,0.1)', padding: '6px 14px', borderRadius: '99px' }}>
                {post.category}
              </span>
            </div>
            
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '32px', letterSpacing: '-0.03em' }}>
              {post.title}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #3f3f46, #18181b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600, color: '#fff' }}>
                SH
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#e4e4e7' }}>StackHound Team</div>
                <div style={{ fontSize: '14px', color: '#71717a' }}>{post.date} · {post.readingTime}</div>
              </div>
            </div>
          </header>

          <hr style={{ border: 0, borderTop: '1px solid rgba(255,255,255,0.05)', margin: '48px 0' }} />

          {/* Body */}
          <div style={{ fontSize: '18px', lineHeight: 1.8, color: '#d4d4d8' }}>
            {post.content.map((paragraph, index) => (
              <p key={index} style={{ marginBottom: '28px' }}>
                {paragraph}
              </p>
            ))}
          </div>
          
          <hr style={{ border: 0, borderTop: '1px solid rgba(255,255,255,0.05)', margin: '60px 0 40px' }} />
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/blog" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#18181b', border: '1px solid #27272a', padding: '12px 24px', borderRadius: '99px', color: '#fff', textDecoration: 'none', fontSize: '15px', fontWeight: 500, transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#27272a';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#18181b';
              (e.currentTarget as HTMLElement).style.borderColor = '#27272a';
            }}>
              {Icons.arrowLeft} Back to all posts
            </Link>
          </div>
        </motion.article>
      </main>

      {/* Footer */}
      <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#71717a', fontSize: '14px', marginTop: 'auto' }}>
        &copy; {new Date().getFullYear()} StackHound Inc. All rights reserved.
      </footer>
    </div>
  );
}
