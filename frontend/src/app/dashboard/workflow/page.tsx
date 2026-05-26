import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workflow Builder — StackHound',
  description: 'Visually design and automate your StackHound data pipelines with a drag-and-drop workflow canvas.',
};

import { WorkflowCanvas } from '@/components/workflow/WorkflowCanvas';
import { Node, Edge } from 'reactflow';

const RECIPES: Record<string, { nodes: Node[], edges: Edge[] }> = {
  'seo-audit': {
    nodes: [
      { id: 't1', type: 'trigger', position: { x: 100, y: 200 }, data: { label: 'Weekly Schedule', schedule: 'Every 7 days' } },
      { id: 's1', type: 'scraper', position: { x: 400, y: 200 }, data: { label: 'Home Page Scraper', url: 'example.com', method: 'GET' } },
      { id: 'o1', type: 'openai', position: { x: 700, y: 200 }, data: { label: 'SEO Analyzer', model: 'gpt-4o', prompt: 'Analyze SEO meta tags' } }
    ],
    edges: [
      { id: 'e1', source: 't1', target: 's1', animated: true, style: { stroke: '#06b6d4', strokeWidth: 1.5 } },
      { id: 'e2', source: 's1', target: 'o1', animated: true, style: { stroke: '#06b6d4', strokeWidth: 1.5 } }
    ]
  },
  'competitor-analysis': {
    nodes: [
      { id: 't1', type: 'trigger', position: { x: 100, y: 200 }, data: { label: 'Daily Trigger', schedule: 'Every 24 hours' } },
      { id: 's1', type: 'scraper', position: { x: 400, y: 200 }, data: { label: 'Competitor Pricing', url: 'competitor.com/pricing', method: 'GET' } },
      { id: 'o1', type: 'openai', position: { x: 700, y: 200 }, data: { label: 'Pricing Analyzer', model: 'gpt-4o', prompt: 'Find changes in pricing plans' } }
    ],
    edges: [
      { id: 'e1', source: 't1', target: 's1', animated: true, style: { stroke: '#06b6d4', strokeWidth: 1.5 } },
      { id: 'e2', source: 's1', target: 'o1', animated: true, style: { stroke: '#06b6d4', strokeWidth: 1.5 } }
    ]
  },
  'cold-email-scraper': {
    nodes: [
      { id: 't1', type: 'trigger', position: { x: 100, y: 200 }, data: { label: 'Manual Trigger', schedule: 'On demand' } },
      { id: 's1', type: 'scraper', position: { x: 400, y: 200 }, data: { label: 'Company About Page', url: 'targetcompany.com/about', method: 'GET' } },
      { id: 'o1', type: 'openai', position: { x: 700, y: 200 }, data: { label: 'Lead Extractor', model: 'gpt-4o', prompt: 'Extract names and roles' } }
    ],
    edges: [
      { id: 'e1', source: 't1', target: 's1', animated: true, style: { stroke: '#06b6d4', strokeWidth: 1.5 } },
      { id: 'e2', source: 's1', target: 'o1', animated: true, style: { stroke: '#06b6d4', strokeWidth: 1.5 } }
    ]
  }
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

export default async function WorkflowPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const recipeId = typeof resolvedParams.recipe === 'string' ? resolvedParams.recipe : undefined;
  const recipe = recipeId ? RECIPES[recipeId] : undefined;

  return (
    <div className="wf-page">
      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <div className="dashboard-topbar">
        <div className="topbar-breadcrumb">
          <span>Dashboard</span>
          <span className="topbar-breadcrumb-sep">/</span>
          <span className="topbar-breadcrumb-current">Workflow Builder</span>
          {recipeId && (
            <>
              <span className="topbar-breadcrumb-sep">/</span>
              <span className="topbar-breadcrumb-current" style={{ color: '#06b6d4' }}>{recipeId}</span>
            </>
          )}
        </div>

        <div className="topbar-actions">
          {/* Node palette button */}
          <button className="wf-topbar-btn" aria-label="Add node">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Node
          </button>
        </div>
      </div>

      {/* ── Fullscreen canvas ─────────────────────────────────────────────── */}
      <div className="wf-canvas-container">
        <WorkflowCanvas defaultNodes={recipe?.nodes} defaultEdges={recipe?.edges} />
      </div>
    </div>
  );
}
