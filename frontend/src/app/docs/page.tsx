'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// --- Icons ---
const Icons = {
  logo: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="white">
      <rect x="1" y="1" width="6" height="6" rx="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
    </svg>
  ),
  external: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
};

const SECTIONS = [
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'dashboard', title: 'Dashboard' },
  { id: 'workflows', title: 'Workflows' },
  { id: 'recipes', title: 'Recipes' },
  { id: 'nodes', title: 'Nodes' },
  { id: 'execution-history', title: 'Execution History' },
  { id: 'api-reference', title: 'API Reference' },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = SECTIONS.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'var(--font-sans)' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        background: '#09090b',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: '28px', height: '28px',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {Icons.logo}
            </div>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>StackHound Docs</span>
          </Link>
        </div>

        <nav style={{ padding: '20px 12px', flex: 1 }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 12px', marginBottom: '12px' }}>
            Contents
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => scrollToSection(e, section.id)}
                  style={{
                    display: 'block',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: activeSection === section.id ? '#fff' : 'rgba(255,255,255,0.6)',
                    background: activeSection === section.id ? 'rgba(99,102,241,0.1)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    fontWeight: activeSection === section.id ? 500 : 400,
                  }}
                  onMouseEnter={e => {
                    if (activeSection !== section.id) {
                      (e.currentTarget as HTMLElement).style.color = '#fff';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeSection !== section.id) {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }
                  }}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ padding: '20px 12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Link href="/dashboard" style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px',
            color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '13px',
            borderRadius: '6px', transition: 'all 0.2s'
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
            Go to Dashboard {Icons.external}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '60px 40px', maxWidth: '900px' }}>
        
        {/* Getting Started */}
        <section id="getting-started" className="doc-section">
          <h1 className="doc-h1">Getting Started</h1>
          <p className="doc-p">
            Welcome to the StackHound documentation! StackHound is an AI-powered stack intelligence platform designed specifically for B2B sales teams.
            It autonomously scrapes, analyzes, and enriches data from any website to give you actionable insights.
          </p>
          
          <div className="doc-callout">
            <strong>Quick Start:</strong> Sign up for an account, head to your Dashboard, paste a company URL into the chat box, and watch StackHound generate actionable intelligence tasks.
          </div>

          <h3 className="doc-h3">Core Concepts</h3>
          <ul className="doc-ul">
            <li><strong>Workspaces:</strong> Isolated environments for your data and workflows.</li>
            <li><strong>Tasks:</strong> AI-generated actionable insights extracted from URLs.</li>
            <li><strong>Workflows:</strong> Automated data pipelines built with nodes.</li>
            <li><strong>Nodes:</strong> The building blocks of workflows (Scrapers, AI, Webhooks).</li>
            <li><strong>Recipes:</strong> Pre-built workflow templates for common use cases.</li>
          </ul>
        </section>

        <hr className="doc-hr" />

        {/* Dashboard */}
        <section id="dashboard" className="doc-section">
          <h1 className="doc-h1">Dashboard</h1>
          <p className="doc-p">
            The Dashboard is your main control center. It features an AI chat interface where you can paste any website URL.
            StackHound will autonomously analyze the website, extract relevant information (like technologies used, key personnel, or company focus), and generate intelligent tasks.
          </p>
          <p className="doc-p">
            Tasks appear immediately below the input area, providing actionable insights about the company's tech stack and contact info.
          </p>
        </section>

        <hr className="doc-hr" />

        {/* Workflows */}
        <section id="workflows" className="doc-section">
          <h1 className="doc-h1">Workflows</h1>
          <p className="doc-p">
            The visual workflow builder allows you to create complex automation pipelines without writing code.
            Built on top of React Flow, it provides a drag-and-drop canvas.
          </p>
          <h3 className="doc-h3">How it works</h3>
          <ol className="doc-ul">
            <li>Start with a <strong>Trigger</strong> node (e.g., a Webhook or a Cron schedule).</li>
            <li>Add <strong>Action</strong> nodes like Scrapers (HTTP Request) or AI (OpenAI GPT).</li>
            <li>Connect the output handles of one node to the input handles of another to define data flow.</li>
            <li>Save and execute your workflow.</li>
          </ol>
        </section>

        <hr className="doc-hr" />

        {/* Recipes */}
        <section id="recipes" className="doc-section">
          <h1 className="doc-h1">Recipes</h1>
          <p className="doc-p">
            Recipes are pre-built workflow templates that allow for one-click deployment of common automation patterns.
          </p>
          <div className="doc-grid">
            <div className="doc-card">
              <h4>Lead Generation</h4>
              <p>Scrape directories and enrich with AI to find contact information.</p>
            </div>
            <div className="doc-card">
              <h4>Data Enrichment</h4>
              <p>Take existing domain lists and extract their full technology stack.</p>
            </div>
            <div className="doc-card">
              <h4>Competitive Analysis</h4>
              <p>Monitor competitors' pricing pages for changes on a schedule.</p>
            </div>
          </div>
        </section>

        <hr className="doc-hr" />

        {/* Nodes */}
        <section id="nodes" className="doc-section">
          <h1 className="doc-h1">Nodes</h1>
          <p className="doc-p">
            Nodes are the individual steps within a workflow.
          </p>
          <table className="doc-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Webhook</strong></td>
                <td>Triggers a workflow when data is received via HTTP POST.</td>
                <td>Trigger</td>
              </tr>
              <tr>
                <td><strong>Cron</strong></td>
                <td>Runs a workflow on a defined schedule.</td>
                <td>Trigger</td>
              </tr>
              <tr>
                <td><strong>HTTP Request</strong></td>
                <td>Fetches or sends data to an external URL (Scraping).</td>
                <td>Action</td>
              </tr>
              <tr>
                <td><strong>OpenAI GPT</strong></td>
                <td>Processes text input using AI to extract or summarize.</td>
                <td>AI</td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr className="doc-hr" />

        {/* Execution History */}
        <section id="execution-history" className="doc-section">
          <h1 className="doc-h1">Execution History</h1>
          <p className="doc-p">
            Track every workflow run in the History tab. You can view the overall status (Success, Failed, Running) and dive deep into individual execution logs.
            Each step in the workflow records its duration, input data, and output data, making debugging simple.
          </p>
        </section>

        <hr className="doc-hr" />

        {/* API Reference */}
        <section id="api-reference" className="doc-section">
          <h1 className="doc-h1">API Reference</h1>
          <p className="doc-p">
            Interact with StackHound programmatically using our REST API.
          </p>
          
          <div className="doc-api-endpoint">
            <span className="doc-badge get">GET</span> <code>/api/workspace</code>
            <p>List all available workspaces for the authenticated user.</p>
          </div>
          
          <div className="doc-api-endpoint">
            <span className="doc-badge get">GET</span> <code>/api/workspace/:id/tasks</code>
            <p>Get all AI-generated tasks for a specific workspace.</p>
          </div>
          
          <div className="doc-api-endpoint">
            <span className="doc-badge post">POST</span> <code>/api/workspace/:id/chat</code>
            <p>Submit a URL for AI analysis. Returns generated tasks.</p>
          </div>
          
          <div className="doc-api-endpoint">
            <span className="doc-badge get">GET</span> <code>/api/nodes</code>
            <p>List all available node types that can be used in workflows.</p>
          </div>

          <div className="doc-api-endpoint">
            <span className="doc-badge post">POST</span> <code>/api/workflows/:id/execute</code>
            <p>Trigger a workflow execution manually.</p>
          </div>
          
          <div className="doc-code-block">
            <pre>
              <code>{`// Example API Call
fetch('http://localhost:3001/api/workspace/ws_123/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://example.com' })
});`}</code>
            </pre>
          </div>
        </section>
        
        <div style={{ height: '100px' }}></div>
      </main>

      <style>{`
        html { scroll-behavior: smooth; }
        .doc-section { margin-bottom: 60px; scroll-margin-top: 80px; }
        .doc-h1 { font-size: 36px; font-weight: 800; margin-bottom: 24px; background: linear-gradient(to right, #fff, #a1a1aa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.02em; }
        .doc-h3 { font-size: 20px; font-weight: 600; margin: 32px 0 16px; color: #f4f4f5; }
        .doc-p { font-size: 16px; line-height: 1.7; color: #a1a1aa; margin-bottom: 20px; }
        .doc-ul { padding-left: 20px; margin-bottom: 24px; color: #a1a1aa; line-height: 1.7; font-size: 16px; }
        .doc-ul li { margin-bottom: 8px; }
        .doc-ul strong { color: #fff; }
        .doc-hr { border: 0; border-top: 1px solid rgba(255,255,255,0.05); margin: 60px 0; }
        
        .doc-callout { padding: 20px; background: rgba(99,102,241,0.1); border-left: 4px solid #6366f1; border-radius: 0 8px 8px 0; color: #e0e7ff; font-size: 15px; line-height: 1.6; margin: 32px 0; }
        
        .doc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 24px; }
        .doc-card { padding: 24px; background: #09090b; border: 1px solid #27272a; border-radius: 12px; }
        .doc-card h4 { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 8px; }
        .doc-card p { font-size: 14px; color: #a1a1aa; line-height: 1.5; margin: 0; }
        
        .doc-table { width: 100%; border-collapse: collapse; margin-top: 24px; font-size: 15px; }
        .doc-table th, .doc-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #27272a; }
        .doc-table th { font-weight: 600; color: #fff; background: #09090b; }
        .doc-table td { color: #a1a1aa; }
        .doc-table strong { color: #fff; }

        .doc-api-endpoint { margin-bottom: 24px; padding: 16px; background: #09090b; border: 1px solid #27272a; border-radius: 8px; }
        .doc-api-endpoint code { font-family: var(--font-mono); font-size: 14px; color: #e4e4e7; }
        .doc-api-endpoint p { margin: 12px 0 0; font-size: 14px; color: #a1a1aa; }
        
        .doc-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; font-family: var(--font-mono); margin-right: 12px; }
        .doc-badge.get { background: rgba(34,197,94,0.1); color: #4ade80; border: 1px solid rgba(34,197,94,0.2); }
        .doc-badge.post { background: rgba(59,130,246,0.1); color: #60a5fa; border: 1px solid rgba(59,130,246,0.2); }

        .doc-code-block { background: #09090b; border: 1px solid #27272a; border-radius: 8px; padding: 20px; overflow-x: auto; margin-top: 24px; }
        .doc-code-block pre { margin: 0; }
        .doc-code-block code { font-family: var(--font-mono); font-size: 14px; color: #818cf8; white-space: pre-wrap; }
        
        @media (max-width: 768px) {
          aside { display: none !important; }
          main { margin-left: 0 !important; padding: 40px 20px !important; }
        }
      `}</style>
    </div>
  );
}
