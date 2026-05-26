'use client';

import Link from 'next/link';

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Developers: ['Documentation', 'API Reference', 'SDK', 'Status'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
};

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '64px 40px 40px',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(4, 1fr)', gap: '48px', marginBottom: '64px' }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '26px', height: '26px',
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                borderRadius: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="white">
                  <rect x="1" y="1" width="6" height="6" rx="1.5" />
                  <rect x="9" y="1" width="6" height="6" rx="1.5" />
                  <rect x="1" y="9" width="6" height="6" rx="1.5" />
                  <rect x="9" y="9" width="6" height="6" rx="1.5" />
                </svg>
              </div>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>StackHound</span>
            </div>
            <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, maxWidth: '200px' }}>
              Stack intelligence for the modern B2B sales team.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['X', 'GH', 'LI'].map(s => (
                <div key={s} style={{
                  width: '30px', height: '30px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '7px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', fontWeight: 700,
                  color: 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  transition: 'background 150ms, color 150ms',
                }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {group}
              </p>
              {links.map(link => (
                <Link key={link} href="#" style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.3)',
                  textDecoration: 'none',
                  transition: 'color 150ms',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'}
                >
                  {link}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} StackHound Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.5)' }} />
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
