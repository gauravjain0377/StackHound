import Link from 'next/link';

export const metadata = {
  title: 'Recipes — StackHound',
  description: 'Pre-built workflow templates to kickstart your automation.',
};

const RECIPES = [
  {
    id: 'competitor-analysis',
    title: 'Competitor Analysis',
    description: 'Automatically monitor competitor pricing pages and extract daily changes using AI.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 'seo-audit',
    title: 'SEO Audit',
    description: 'Weekly scheduled scrape of your target pages to analyze meta tags and SEO health.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    id: 'cold-email-scraper',
    title: 'Cold Email Scraper',
    description: 'Extract decision-maker roles and names from target company "About Us" pages.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function RecipesPage() {
  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#ffffff' }}>
      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <div className="dashboard-topbar" style={{ borderBottom: '1px solid #27272a', padding: '16px 24px' }}>
        <div className="topbar-breadcrumb">
          <span>Dashboard</span>
          <span className="topbar-breadcrumb-sep" style={{ margin: '0 8px', color: '#52525b' }}>/</span>
          <span className="topbar-breadcrumb-current">Recipes</span>
        </div>
      </div>

      {/* ── Strict 20px gap below header ──────────────────────────────────── */}
      <div style={{ marginTop: '20px', padding: '0 24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 8px 0' }}>Template Library</h1>
          <p style={{ color: '#a1a1aa', margin: 0 }}>Start with a pre-built workflow recipe to accelerate your automations.</p>
        </div>

        {/* ── Grid ──────────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {RECIPES.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/dashboard/workflow?recipe=${recipe.id}`}
              style={{ textDecoration: 'none' }}
              className="recipe-card-link"
            >
              <div
                className="recipe-card"
                style={{
                  backgroundColor: '#09090b', // slightly elevated from pure black
                  border: '1px solid #27272a',
                  borderRadius: '12px',
                  padding: '24px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
                }}
              >
                <div
                  className="recipe-icon-wrapper"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    color: '#06b6d4', // Tech Blue
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    transition: 'background-color 0.2s',
                  }}
                >
                  {recipe.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f4f4f5', margin: '0 0 8px 0' }}>
                  {recipe.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#a1a1aa', margin: '0 0 24px 0', lineHeight: '1.5', flexGrow: 1 }}>
                  {recipe.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', color: '#06b6d4', fontSize: '14px', fontWeight: '500' }}>
                  Use Template
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .recipe-card-link .recipe-card:hover {
          border-color: #06b6d4 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(6, 182, 212, 0.1);
        }
        .recipe-card-link .recipe-card:hover .recipe-icon-wrapper {
          background-color: rgba(6, 182, 212, 0.2) !important;
        }
      `}</style>
    </div>
  );
}
