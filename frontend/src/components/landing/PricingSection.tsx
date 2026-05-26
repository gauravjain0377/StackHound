'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'For solo builders exploring automation.',
    color: '#818cf8',
    features: [
      '1,000 enrichments / month',
      '3 active workflows',
      'Community support',
      'REST API access',
      'Basic analytics',
    ],
    cta: 'Start free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/ month',
    description: 'For growing teams that need serious velocity.',
    color: '#06b6d4',
    features: [
      '25,000 enrichments / month',
      'Unlimited workflows',
      'Priority support',
      'TypeScript SDK',
      'Advanced analytics',
      'Team collaboration',
      'Custom webhooks',
    ],
    cta: 'Start 14-day trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For orgs that need control, compliance, and scale.',
    color: '#fbbf24',
    features: [
      'Unlimited everything',
      'Private cloud deployment',
      'SOC 2 Type II',
      'Dedicated CSM',
      'SLA guarantee',
      'SSO / SAML',
      'Audit logs',
      'Custom contracts',
    ],
    cta: 'Talk to sales',
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" style={{ padding: '120px 40px', position: 'relative' }}>
      <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
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
            textTransform: 'uppercase', color: '#4ade80',
            background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)',
            padding: '2px 9px', borderRadius: '20px',
          }}>Pricing</span>
          <h2 style={{
            marginTop: '16px',
            fontSize: 'clamp(32px, 4.5vw, 48px)',
            fontWeight: 300, color: '#fff',
            letterSpacing: '-0.04em', lineHeight: 1.15,
          }}>
            Simple pricing.<br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>No hidden nonsense.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', alignItems: 'start' }}>
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              style={{
                background: '#09090B',
                border: plan.popular ? `1px solid ${plan.color}60` : '1px solid #27272a',
                borderRadius: '20px',
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 250ms, box-shadow 250ms',
                boxShadow: plan.popular ? `0 0 40px ${plan.color}12` : 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${plan.color}60`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${plan.color}15`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = plan.popular ? `${plan.color}60` : '#27272a';
                (e.currentTarget as HTMLElement).style.boxShadow = plan.popular ? `0 0 40px ${plan.color}12` : 'none';
              }}
            >
              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, ${plan.color}, transparent)`,
              }} />

              {/* Popular badge */}
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: '14px', right: '14px',
                  padding: '3px 10px',
                  background: `${plan.color}18`,
                  border: `1px solid ${plan.color}40`,
                  borderRadius: '20px',
                  fontSize: '10px', fontWeight: 700,
                  color: plan.color,
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                }}>
                  Most popular
                </div>
              )}

              {/* Name */}
              <p style={{ fontSize: '14px', fontWeight: 600, color: plan.color, marginBottom: '16px' }}>
                {plan.name}
              </p>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
                <span style={{ fontSize: '42px', fontWeight: 700, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>
                    {plan.period}
                  </span>
                )}
              </div>

              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5, marginBottom: '24px' }}>
                {plan.description}
              </p>

              {/* CTA */}
              <Link href="/sign-up" style={{
                display: 'block',
                textAlign: 'center',
                padding: '11px',
                borderRadius: '10px',
                fontWeight: 600, fontSize: '13.5px',
                textDecoration: 'none',
                marginBottom: '24px',
                transition: 'all 200ms',
                ...(plan.popular
                  ? { background: plan.color, color: '#000', boxShadow: `0 0 24px ${plan.color}40` }
                  : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }
                ),
              }}>
                {plan.cta}
              </Link>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {plan.features.map(feat => (
                  <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.5)' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
