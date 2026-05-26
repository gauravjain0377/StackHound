'use client';

import { motion } from 'framer-motion';

const INTEGRATIONS = [
  { name: 'Salesforce', color: '#00A1E0' },
  { name: 'HubSpot', color: '#FF7A59' },
  { name: 'Slack', color: '#4A154B' },
  { name: 'Notion', color: '#fff' },
  { name: 'Zapier', color: '#FF4A00' },
  { name: 'Airtable', color: '#18BFFF' },
  { name: 'Segment', color: '#52BD94' },
  { name: 'Snowflake', color: '#29B5E8' },
  { name: 'BigQuery', color: '#4285F4' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Stripe', color: '#635BFF' },
  { name: 'Intercom', color: '#1F8DED' },
  { name: 'Linear', color: '#5E6AD2' },
  { name: 'GitHub', color: '#fff' },
  { name: 'Jira', color: '#0052CC' },
  { name: 'Webhook', color: '#06b6d4' },
];

function IntegrationPill({ name, color, index }: { name: string; color: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 + index * 0.04, duration: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '12px 20px',
        background: '#09090B',
        border: '1px solid #27272a',
        borderRadius: '12px',
        cursor: 'default',
        transition: 'border-color 200ms, box-shadow 200ms',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}60`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}15`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = '#27272a';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      <div style={{
        width: '8px', height: '8px', borderRadius: '50%',
        background: color, boxShadow: `0 0 6px ${color}80`,
        flexShrink: 0,
      }} />
      <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{name}</span>
    </motion.div>
  );
}

export function IntegrationsSection() {
  return (
    <section style={{ padding: '100px 40px', position: 'relative' }}>
      {/* Subtle glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
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
            textTransform: 'uppercase', color: '#06b6d4',
            background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)',
            padding: '2px 9px', borderRadius: '20px',
          }}>Integrations</span>
          <h2 style={{
            marginTop: '16px',
            fontSize: 'clamp(32px, 4.5vw, 48px)',
            fontWeight: 300, color: '#fff',
            letterSpacing: '-0.04em', lineHeight: 1.15,
          }}>
            Plugs into your existing stack.<br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>Plays nice with everything.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
        }}>
          {INTEGRATIONS.map((int, i) => (
            <IntegrationPill key={int.name} name={int.name} color={int.color} index={i} />
          ))}
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            textAlign: 'center', marginTop: '28px',
            fontSize: '13px', color: 'rgba(255,255,255,0.25)',
          }}
        >
          + 40 more integrations via REST API and webhooks
        </motion.p>
      </div>
    </section>
  );
}
