import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workflow Builder — StackHound',
  description: 'Visually design and automate your StackHound data pipelines with a drag-and-drop workflow canvas.',
};

import { WorkflowCanvas } from '@/components/workflow/WorkflowCanvas';

export default function WorkflowPage() {
  return (
    <div className="wf-page">
      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <div className="dashboard-topbar">
        <div className="topbar-breadcrumb">
          <span>Dashboard</span>
          <span className="topbar-breadcrumb-sep">/</span>
          <span className="topbar-breadcrumb-current">Workflow Builder</span>
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
        <WorkflowCanvas />
      </div>
    </div>
  );
}
