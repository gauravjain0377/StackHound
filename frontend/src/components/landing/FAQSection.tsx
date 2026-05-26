'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    question: 'How does StackHound differ from Clay or Apollo?',
    answer: 'StackHound goes beyond simple enrichment. We provide a full visual automation engine where you can chain scrapers, AI models, and CRM syncs into custom workflows — no code needed. Think of it as Zapier + Clay + AI, unified in one canvas.',
  },
  {
    question: 'What data sources do you scrape?',
    answer: 'We can scrape any publicly available website, LinkedIn company pages, job boards, review sites, and more. Our AI extracts structured data (firmographics, technographics, hiring signals, funding data) from raw HTML in real-time.',
  },
  {
    question: 'Is the data actually verified?',
    answer: 'Yes. Every AI-extracted data point is cross-referenced against at least 2 independent sources before it enters your pipeline. Our accuracy rate is 98%+, and we flag any data point we cannot verify with a confidence score.',
  },
  {
    question: 'Can I self-host StackHound?',
    answer: 'Enterprise customers can deploy StackHound in their own VPC or private cloud. We support AWS, GCP, and Azure. This includes full data isolation, custom SSO, and dedicated infrastructure.',
  },
  {
    question: 'What happens if I exceed my enrichment limit?',
    answer: 'We will never cut you off mid-workflow. You will receive alerts at 80% and 95% usage. Overage is billed at a fair per-enrichment rate, or you can upgrade your plan instantly from the dashboard.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'The Starter plan is free forever with 1,000 enrichments per month. For Pro features, we offer a 14-day free trial with no credit card required. Cancel anytime.',
  },
];

function FAQItem({ item, isOpen, onToggle, index }: {
  item: typeof FAQS[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '22px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: isOpen ? '#fff' : 'rgba(255,255,255,0.65)',
          fontSize: '15px',
          fontWeight: 500,
          textAlign: 'left',
          transition: 'color 200ms',
          letterSpacing: '-0.01em',
          fontFamily: 'inherit',
        }}
      >
        <span>{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            width: '24px', height: '24px',
            borderRadius: '6px',
            background: isOpen ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
            border: isOpen ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginLeft: '16px',
            transition: 'all 200ms',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? '#818cf8' : 'rgba(255,255,255,0.4)'} strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.75,
              paddingBottom: '22px',
              maxWidth: '640px',
            }}>
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section style={{ padding: '100px 40px', position: 'relative' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <span style={{
            fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: '#fbbf24',
            background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)',
            padding: '2px 9px', borderRadius: '20px',
          }}>FAQ</span>
          <h2 style={{
            marginTop: '16px',
            fontSize: 'clamp(32px, 4.5vw, 48px)',
            fontWeight: 300, color: '#fff',
            letterSpacing: '-0.04em', lineHeight: 1.15,
          }}>
            Questions? Answered.
          </h2>
        </motion.div>

        {/* Items */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
