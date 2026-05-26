'use client';

import { Handle, Position, NodeProps } from 'reactflow';

export interface TriggerNodeData {
  label?: string;
  description?: string;
  schedule?: string;
}

export function TriggerNode({ data, selected }: NodeProps<TriggerNodeData>) {
  return (
    <div className={`wf-node wf-node--trigger${selected ? ' wf-node--selected' : ''}`}>
      {/* Glow accent bar */}
      <div className="wf-node-accent wf-node-accent--trigger" />

      {/* Header */}
      <div className="wf-node-header">
        <div className="wf-node-icon wf-node-icon--trigger">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <div className="wf-node-header-text">
          <span className="wf-node-title">{data.label ?? 'Trigger'}</span>
          <span className="wf-node-badge wf-node-badge--trigger">START</span>
        </div>
      </div>

      {/* Description */}
      <p className="wf-node-desc">
        {data.description ?? 'Initiates the workflow on schedule or webhook event.'}
      </p>

      {/* Meta row */}
      {data.schedule && (
        <div className="wf-node-meta-row">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="wf-node-meta-label">{data.schedule}</span>
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
