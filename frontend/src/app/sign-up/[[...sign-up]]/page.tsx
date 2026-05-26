'use client';

import { SignUp } from '@clerk/nextjs';
import { clerkAppearance } from '@/lib/clerkAppearance';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="signup-container" style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#000', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      
      {/* Dynamic Background Elements */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '60vw',
            height: '60vw',
            background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '70vw',
            height: '70vw',
            background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}
        />
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.5
        }}></div>
      </div>

      {/* Left Column: Branding & Value Prop */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px', zIndex: 1, borderRight: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(9,9,11,0.6) 100%)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: 'auto' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px rgba(99,102,241,0.6)',
          }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="white">
              <rect x="1" y="1" width="6" height="6" rx="1.5" />
              <rect x="9" y="1" width="6" height="6" rx="1.5" />
              <rect x="1" y="9" width="6" height="6" rx="1.5" />
              <rect x="9" y="9" width="6" height="6" rx="1.5" />
            </svg>
          </div>
          <span style={{ fontSize: '24px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>StackHound</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 style={{ fontSize: '48px', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', background: 'linear-gradient(to right, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Start building your data empire.
          </h1>
          <p style={{ fontSize: '18px', color: '#a1a1aa', lineHeight: 1.6, maxWidth: '480px' }}>
            Create an account to deploy autonomous agents, set up custom triggers, and seamlessly connect your workflows to your B2B outbound stack.
          </p>
        </motion.div>

        <div style={{ marginTop: 'auto', color: '#52525b', fontSize: '14px' }}>
          &copy; {new Date().getFullYear()} StackHound Inc. All rights reserved.
        </div>
      </div>

      {/* Right Column: Clerk Auth */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ width: '100%', maxWidth: '400px' }}
        >
          <SignUp appearance={{
            ...clerkAppearance,
            elements: {
              ...clerkAppearance?.elements,
              card: 'bg-[#09090b] border border-[#27272a] shadow-2xl rounded-2xl',
              headerTitle: 'text-white',
              headerSubtitle: 'text-zinc-400',
              socialButtonsBlockButton: 'border-zinc-800 hover:bg-zinc-800 text-white',
              dividerLine: 'bg-zinc-800',
              dividerText: 'text-zinc-500',
              formFieldLabel: 'text-zinc-300',
              formFieldInput: 'bg-black border-zinc-800 text-white focus:border-cyan-500',
              formButtonPrimary: 'bg-indigo-500 hover:bg-indigo-600 text-white',
              footerActionText: 'text-zinc-400',
              footerActionLink: 'text-cyan-400 hover:text-cyan-300',
            }
          }} />
        </motion.div>
      </div>
      
      <style>{`
        @media (max-width: 900px) {
          .signup-container {
            flex-direction: column !important;
          }
          .signup-container > div:nth-child(2) {
            display: none !important; /* Hide left column on mobile */
          }
        }
      `}</style>
    </div>
  );
}
