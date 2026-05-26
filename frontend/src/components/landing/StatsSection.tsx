'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 1200, suffix: '+', label: 'Teams building on StackHound', prefix: '' },
  { value: 94, suffix: 'M+', label: 'Data points enriched weekly', prefix: '' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA guaranteed', prefix: '' },
  { value: 1.8, suffix: 's', label: 'Average workflow execution', prefix: '<' },
];

function Counter({ target, suffix, prefix, running }: { target: number; suffix: string; prefix: string; running: boolean }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const duration = 1800;

  useEffect(() => {
    if (!running) return;
    startRef.current = null;

    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(parseFloat((eased * target).toFixed(target % 1 !== 0 ? 1 : 0)));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, target]);

  const display = target % 1 !== 0 ? count.toFixed(1) : Math.round(count).toLocaleString();
  return <>{prefix}{display}{suffix}</>;
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} style={{ padding: '0 40px', marginTop: '-1px', position: 'relative', zIndex: 2 }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        background: 'rgba(255,255,255,0.015)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px',
        padding: '40px 60px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '48px',
      }}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', textAlign: 'center' }}
          >
            <div style={{
              fontSize: '38px',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}>
              <Counter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} running={inView} />
            </div>
            <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5, fontWeight: 450 }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
