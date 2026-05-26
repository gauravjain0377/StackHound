'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  dashboard: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
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
  inbox: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  search: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
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
  zap: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

// ─── Nav Items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Home',      href: '/dashboard',           icon: Icons.home },
  { label: 'Dashboard', href: '/dashboard/stats',     icon: Icons.dashboard },
  { label: 'Recipes',   href: '/dashboard/recipes',   icon: Icons.recipes },
  { label: 'Workflows', href: '/dashboard/workflow', icon: Icons.workflows },
  { label: 'Nodes',     href: '/dashboard/nodes',     icon: Icons.nodes },
  { label: 'Inbox',     href: '/dashboard/inbox',     icon: Icons.inbox },
  { label: 'Search',    href: '/dashboard/search',    icon: Icons.search },
];

// ─── Component ────────────────────────────────────────────────────────────────

import { UserButton } from '@clerk/nextjs';
import { clerkAppearance } from '@/lib/clerkAppearance';

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside className="sidebar">

      {/* ── Brand ─────────────────────────────────────────────────────── */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">
          {Icons.logo}
        </div>
        <span className="sidebar-brand-text">StackHound</span>
        <span className="sidebar-brand-badge">Beta</span>
      </div>

      {/* ── Main Nav ──────────────────────────────────────────────────── */}
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

      {/* ── Spacer ────────────────────────────────────────────────────── */}
      <div className="sidebar-spacer" />

      {/* ── Credits Widget ────────────────────────────────────────────── */}
      <div className="sidebar-credits">
        <div>
          <p className="sidebar-credits-title">Credits</p>
          <p className="sidebar-credits-sub">45 / 1,000 workflow runs used</p>
        </div>

        <div>
          <div className="sidebar-credits-bar-bg">
            <div className="sidebar-credits-bar-fill" />
          </div>
          <div className="sidebar-credits-meta" style={{ marginTop: '6px' }}>
            <span>5% used</span>
            <span>955 remaining</span>
          </div>
        </div>

        <button className="sidebar-credits-btn">
          {Icons.zap}&nbsp; Upgrade to Starter
        </button>
      </div>

      {/* ── Bottom Links ──────────────────────────────────────────────── */}
      <div className="sidebar-bottom">
        <Link href="/docs" className="sidebar-nav-item">
          {Icons.docs}
          Documentation
        </Link>
        <Link href="/blogs" className="sidebar-nav-item">
          {Icons.blogs}
          Blog
        </Link>
      </div>

      {/* ── User Profile ──────────────────────────────────────────────── */}
      <div style={{ padding: '0 16px 20px', display: 'flex', alignItems: 'center' }}>
        <UserButton appearance={clerkAppearance} />
        <span style={{ marginLeft: '12px', fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>Account</span>
      </div>

    </aside>
  );
}
