'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import { useState, useRef, useEffect } from 'react';

// ─── Icons ────────────────────────────────────────────────────────────────────

const Icons = {
  logo: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
      <rect x="1" y="1" width="6" height="6" rx="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
    </svg>
  ),
  home: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  recipes: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  workflows: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <line x1="12" y1="7" x2="12" y2="13" />
      <line x1="12" y1="13" x2="5" y2="17" />
      <line x1="12" y1="13" x2="19" y2="17" />
    </svg>
  ),
  docs: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  blogs: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  nodes: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="6" r="2" />
      <circle cx="20" cy="6" r="2" />
      <circle cx="4" cy="18" r="2" />
      <circle cx="20" cy="18" r="2" />
      <line x1="6" y1="6" x2="9.5" y2="10.5" />
      <line x1="18" y1="6" x2="14.5" y2="10.5" />
      <line x1="6" y1="18" x2="9.5" y2="13.5" />
      <line x1="18" y1="18" x2="14.5" y2="13.5" />
    </svg>
  ),
  history: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="12 8 12 12 14 14" />
      <path d="M3.05 11a9 9 0 1 0 .5-4" />
      <polyline points="3 3 3 7 7 7" />
    </svg>
  ),
  externalLink: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  chevronUpDown: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="7 15 12 20 17 15" />
      <polyline points="7 9 12 4 17 9" />
    </svg>
  ),
  user: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  settings: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  logout: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
};

// ─── Nav Items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Home',      href: '/dashboard',           icon: Icons.home },
  { label: 'Recipes',   href: '/dashboard/recipes',   icon: Icons.recipes },
  { label: 'Workflows', href: '/dashboard/workflow',  icon: Icons.workflows },
  { label: 'History',   href: '/dashboard/history',   icon: Icons.history },
  { label: 'Nodes',     href: '/dashboard/nodes',     icon: Icons.nodes },
];

// ─── Profile Dropdown ─────────────────────────────────────────────────────────

function ProfileDropdown({ onClose }: { onClose: () => void }) {
  const { signOut } = useClerk();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const menuItems = [
    {
      icon: Icons.user,
      label: 'Profile',
      onClick: () => { router.push('/dashboard/settings'); onClose(); },
    },
    {
      icon: Icons.settings,
      label: 'Settings',
      onClick: () => { router.push('/dashboard/settings'); onClose(); },
    },
    {
      icon: Icons.logout,
      label: 'Sign out',
      onClick: () => { signOut(() => router.push('/')); },
      danger: true,
    },
  ];

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'absolute',
        bottom: '100%',
        left: '8px',
        right: '8px',
        marginBottom: '6px',
        background: '#111113',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '4px',
        zIndex: 100,
        boxShadow: '0 -8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)',
        animation: 'slideUp 0.15s ease-out',
      }}
    >
      {menuItems.map((item, i) => (
        <button
          key={item.label}
          onClick={item.onClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: '9px 12px',
            background: 'transparent',
            border: 'none',
            borderRadius: '8px',
            color: item.danger ? '#f87171' : 'rgba(255,255,255,0.6)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 120ms, color 120ms',
            fontFamily: 'inherit',
            textAlign: 'left',
            borderTop: i === menuItems.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            marginTop: i === menuItems.length - 1 ? '4px' : '0',
            paddingTop: i === menuItems.length - 1 ? '12px' : '9px',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = item.danger
              ? 'rgba(248,113,113,0.08)'
              : 'rgba(255,255,255,0.05)';
            (e.currentTarget as HTMLElement).style.color = item.danger
              ? '#f87171'
              : 'rgba(255,255,255,0.9)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color = item.danger
              ? '#f87171'
              : 'rgba(255,255,255,0.6)';
          }}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/';
    return pathname.startsWith(href);
  };

  // User info
  const displayName = user?.firstName
    ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
    : user?.username || 'User';
  const email = user?.primaryEmailAddress?.emailAddress || '';
  const initials = user?.firstName
    ? `${user.firstName[0]}${user.lastName?.[0] || ''}`.toUpperCase()
    : displayName[0]?.toUpperCase() || 'U';
  const avatarUrl = user?.imageUrl;

  return (
    <aside className="sidebar">

      {/* ── Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">
          {Icons.logo}
        </div>
        <span className="sidebar-brand-text">StackHound</span>
        <span className="sidebar-brand-badge">Beta</span>
      </div>

      {/* ── Main Nav */}
      <nav className="sidebar-nav-section" style={{ marginTop: '4px' }}>
        <p className="sidebar-nav-label">Menu</p>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`sidebar-nav-item${active ? ' active' : ''}`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* ── Spacer */}
      <div className="sidebar-spacer" />

      {/* ── Bottom Links (open in new tab) */}
      <div className="sidebar-bottom">
        <a
          href="/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-nav-item"
        >
          {Icons.docs}
          Documentation
          <span style={{ marginLeft: 'auto', opacity: 0.4, display: 'flex' }}>{Icons.externalLink}</span>
        </a>
        <a
          href="/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-nav-item"
        >
          {Icons.blogs}
          Blog
          <span style={{ marginLeft: 'auto', opacity: 0.4, display: 'flex' }}>{Icons.externalLink}</span>
        </a>
      </div>

      {/* ── User Profile Widget */}
      <div style={{ position: 'relative', padding: '0 8px 16px' }}>
        {showDropdown && <ProfileDropdown onClose={() => setShowDropdown(false)} />}
        <button
          onClick={() => setShowDropdown(prev => !prev)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: '10px',
            background: showDropdown ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${showDropdown ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'background 150ms, border-color 150ms',
            fontFamily: 'inherit',
            textAlign: 'left',
          }}
          onMouseEnter={e => {
            if (!showDropdown) {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
            }
          }}
          onMouseLeave={e => {
            if (!showDropdown) {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
            }
          }}
        >
          {/* Avatar */}
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
                letterSpacing: '0.02em',
              }}
            >
              {initials}
            </div>
          )}

          {/* Name & email */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.85)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.3,
              }}
            >
              {displayName}
            </div>
            <div
              style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.35)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.3,
              }}
            >
              {email}
            </div>
          </div>

          {/* Chevron */}
          <span style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0, display: 'flex' }}>
            {Icons.chevronUpDown}
          </span>
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </aside>
  );
}
