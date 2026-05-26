'use client';

import React, { useState, useEffect, FormEvent, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Icons ────────────────────────────────────────────────────────────────────

const Icons = {
  slack: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>
      <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/>
      <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
      <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/>
      <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
      <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/>
      <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>
    </svg>
  ),
  discord: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="12" r="1"/>
      <circle cx="15" cy="12" r="1"/>
      <path d="M7.5 16.5c3 2 5.5 2 9 0"/>
      <path d="M20.5 4.5c-2.5-1-5.5-1-8.5-1s-6 0-8.5 1c-1 3-2 10.5-1 15 2.5 1.5 5.5 2 9.5 2s7-.5 9.5-2c1-4.5 0-12-1-15z"/>
    </svg>
  ),
  telegram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  attachment: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
    </svg>
  ),
  send: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  chevronRight: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  sparkle: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L14.5 8.5L20 9.27L16 13.14L17.18 18.82L12 16L6.82 18.82L8 13.14L4 9.27L9.5 8.5L12 3Z"/>
    </svg>
  ),
  aiPulse: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  )
};

// ─── Types ────────────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

interface Task {
  _id: string;
  title: string;
  metric: string;
  status: string;
  createdAt: string;
}

// ─── Action Card ──────────────────────────────────────────────────────────────

interface ActionCardProps {
  label: string;
  value: string;
  index: number;
}

function ActionCard({ label, value, index }: ActionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className="group flex items-center justify-between w-full cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        padding: '16px 20px',
        transition: 'background 200ms, border-color 200ms',
        marginBottom: '20px', // Strict 20px gap as requested
      }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
    >
      <span style={{ fontSize: '14.5px', fontWeight: 400, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>{value}</span>
        <span style={{ transition: 'transform 200ms, color 200ms' }}>{Icons.chevronRight}</span>
      </div>
    </motion.div>
  );
}

function ActionCardSkeleton() {
  return (
    <div style={{
      height: '58px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '16px',
      overflow: 'hidden',
      marginBottom: '20px',
    }} className="skeleton" />
  );
}

// ─── Top Integration Badge ────────────────────────────────────────────────────

function IntegrationBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '7px',
      padding: '6px 12px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '99px',
      fontSize: '12px',
      color: 'rgba(255,255,255,0.55)',
      cursor: 'pointer',
      transition: 'background 150ms, border-color 150ms, color 150ms',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
        (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
        (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)';
      }}
    >
      {icon}
      {label}
    </div>
  );
}

// ─── Loading Stream Effect ──────────────────────────────────────────────────

function AILoadingStream() {
  const texts = ["Analyzing the web...", "Scraping content...", "Extracting intelligence...", "Generating action tasks..."];
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100%', 
      minHeight: '110px',
      width: '100%',
      gap: '12px'
    }}>
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{ color: '#818cf8' }}
      >
        {Icons.sparkle}
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.span
          key={textIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {texts[textIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setIsLoading(true);
        const wsRes = await fetch(`${API_BASE}/api/workspace`);
        const wsData = await wsRes.json();
        if (wsData.success && wsData.data.length > 0) {
          const wsId = wsData.data[0]._id;
          if (isMounted) setWorkspaceId(wsId);
          const tasksRes = await fetch(`${API_BASE}/api/workspace/${wsId}/tasks`);
          const tasksData = await tasksRes.json();
          if (tasksData.success && isMounted) setTasks(tasksData.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);

  const handleSend = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || !workspaceId || isSending) return;
    
    const messageToSend = inputMessage;
    // 1. Immediately clear the input and show loading state
    setInputMessage('');
    setIsSending(true);

    try {
      const res = await fetch(`${API_BASE}/api/workspace/${workspaceId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: messageToSend, role: 'user' }), // Send as URL per requirements
      });
      
      const data = await res.json();
      
      if (res.ok && data.success && data.data) {
        // 2. Prepend new tasks to trigger Framer Motion slide-in animation
        setTasks(prevTasks => [...data.data, ...prevTasks]);
      } else {
        console.error('Failed to process URL:', data.error);
        // Optionally put message back on failure
        // setInputMessage(messageToSend); 
      }
    } catch (err) {
      console.error('Failed to send:', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#000', overflow: 'hidden' }}>

      {/* ── Top Bar ─────────────────────────────────────────────────────── */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 32px',
        height: '52px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        flexShrink: 0,
        gap: '10px',
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.45)', marginRight: '4px' }}>
          Connect your stack
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IntegrationBadge icon={Icons.slack}    label="Slack" />
          <IntegrationBadge icon={Icons.discord}  label="Discord" />
          <IntegrationBadge icon={Icons.telegram} label="Telegram" />
        </div>
      </header>

      {/* ── Main Canvas ─────────────────────────────────────────────────── */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Changed from center to allow scrolling
        padding: '32px 24px 48px',
        overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: '680px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* ── Hero ───────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ textAlign: 'center', marginBottom: '40px', marginTop: '40px' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '5px 12px',
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.18)',
              borderRadius: '99px',
              fontSize: '11px',
              fontWeight: 600,
              color: '#818cf8',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              {Icons.sparkle}
              AI-Powered Stack Intelligence
            </div>

            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 42px)',
              fontWeight: 300,
              color: '#fff',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              marginBottom: '12px',
            }}>
              What are we{' '}
              <span style={{
                background: 'linear-gradient(135deg, #818cf8, #a5b4fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 500,
              }}>
                building
              </span>
              {' '}today?
            </h1>

            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
              Paste a URL, and StackHound will autonomously analyze it.
            </p>
          </motion.div>

          {/* ── Input Box ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
            style={{ width: '100%', position: 'relative', marginBottom: '48px' }}
          >
            {/* Pulsing AI Glow ring when sending */}
            <motion.div 
              animate={isSending ? {
                boxShadow: [
                  '0 0 0px 0px rgba(99,102,241,0.0)',
                  '0 0 20px 4px rgba(99,102,241,0.3)',
                  '0 0 0px 0px rgba(99,102,241,0.0)'
                ]
              } : {}}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              style={{
              position: 'absolute',
              inset: '-1px',
              borderRadius: '22px',
              background: isSending 
                ? 'linear-gradient(135deg, rgba(99,102,241,0.8), rgba(165,180,252,0.6), rgba(99,102,241,0.8))'
                : isFocused
                  ? 'linear-gradient(135deg, rgba(99,102,241,0.6), rgba(165,180,252,0.4), rgba(99,102,241,0.6))'
                  : 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(165,180,252,0.08), rgba(99,102,241,0.15))',
              transition: 'all 300ms ease',
              filter: isFocused || isSending ? 'blur(2px)' : 'blur(1px)',
            }} />

            <form
              onSubmit={handleSend}
              style={{
                width: '100%',
                background: '#0a0a0c',
                borderRadius: '20px',
                padding: '6px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {isSending ? (
                <AILoadingStream />
              ) : (
                <>
                  <textarea
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={!workspaceId}
                    rows={3}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      resize: 'none',
                      padding: '14px 18px 8px',
                      fontSize: '15px',
                      color: '#fff',
                      lineHeight: 1.6,
                      fontFamily: 'inherit',
                    }}
                    placeholder="Paste a website URL to generate intelligent tasks..."
                  />

                  {/* Bottom bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '4px 10px 8px',
                  }}>
                    <button
                      type="button"
                      style={{
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.35)',
                        cursor: 'pointer',
                        transition: 'background 150ms, color 150ms',
                      }}
                    >
                      {Icons.attachment}
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
                        Enter to send · Shift+Enter for newline
                      </span>
                      <button
                        type="submit"
                        disabled={!inputMessage.trim() || !workspaceId}
                        style={{
                          width: '36px',
                          height: '36px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '10px',
                          background: inputMessage.trim() ? '#6366f1' : 'rgba(255,255,255,0.06)',
                          border: 'none',
                          color: inputMessage.trim() ? '#fff' : 'rgba(255,255,255,0.2)',
                          cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                          transition: 'background 200ms, box-shadow 200ms',
                          boxShadow: inputMessage.trim() ? '0 0 16px rgba(99,102,241,0.4)' : 'none',
                        }}
                      >
                        {Icons.send}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </motion.div>

          {/* ── Tasks List ──────────────────────────────────────────────── */}
          <div style={{ width: '100%' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Recent tasks
              </p>
              {!isLoading && (
                <span style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.35)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '99px',
                  padding: '2px 10px',
                }}>
                  {tasks.length} tasks · last 7 days
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              {isLoading ? (
                <>
                  <ActionCardSkeleton />
                  <ActionCardSkeleton />
                  <ActionCardSkeleton />
                  <ActionCardSkeleton />
                </>
              ) : tasks.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  border: '1px dashed rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '13.5px',
                  lineHeight: 1.6,
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '10px', opacity: 0.4 }}>⚡</div>
                  No tasks yet. Paste a link to get started.
                </div>
              ) : (
                <AnimatePresence>
                  {tasks.map((task, i) => (
                    <ActionCard key={task._id} label={task.title} value={task.metric} index={i} />
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
