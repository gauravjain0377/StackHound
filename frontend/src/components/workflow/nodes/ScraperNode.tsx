'use client';

import { Handle, Position, NodeProps } from 'reactflow';

export interface ScraperNodeData {
  label?: string;
  description?: string;
  url?: string;
  method?: 'GET' | 'POST';
}

export function ScraperNode({ data, selected }: NodeProps<ScraperNodeData>) {
  return (
    <div className={`wf-node wf-node--scraper${selected ? ' wf-node--selected' : ''}`}>
      <div className="wf-node-accent wf-node-accent--scraper" />

      {/* Target handle — left */}
      <Handle
        type="target"
        position={Position.Left}
        className="wf-handle wf-handle--target"
      />

      {/* Header */}
      <div className="wf-node-header">
        <div className="wf-node-icon wf-node-icon--scraper">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        <div className="wf-node-header-text">
          <span className="wf-node-title">{data.label ?? 'Web Scraper'}</span>
          <span className="wf-node-badge wf-node-badge--scraper">FETCH</span>
        </div>
      </div>

      {/* Description */}
      <p className="wf-node-desc">
        {data.description ?? 'Fetches and extracts structured data from any web URL.'}
      </p>

      {/* URL preview */}
      {data.url && (
        <div className="wf-node-url-row">
          <span className={`wf-node-method wf-node-method--${(data.method ?? 'GET').toLowerCase()}`}>
            {data.method ?? 'GET'}
          </span>
          <span className="wf-node-url-text">{data.url}</span>
        </div>
      )}

      {/* Source handle — right */}
      <Handle
        type="source"
        position={Position.Right}
        className="wf-handle wf-handle--source"
      />
    </div>
  );
}
