'use client';

import { Handle, Position, NodeProps } from 'reactflow';

export interface OpenAINodeData {
  label?: string;
  description?: string;
  model?: string;
  prompt?: string;
}

export function OpenAINode({ data, selected }: NodeProps<OpenAINodeData>) {
  return (
    <div className={`wf-node wf-node--openai${selected ? ' wf-node--selected' : ''}`}>
      <div className="wf-node-accent wf-node-accent--openai" />

      {/* Target handle — left */}
      <Handle
        type="target"
        position={Position.Left}
        className="wf-handle wf-handle--target"
      />

      {/* Header */}
      <div className="wf-node-header">
        <div className="wf-node-icon wf-node-icon--openai">
          {/* OpenAI-style icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.856 19.93a4.5 4.5 0 0 1-6.257-1.626zM2.087 7.869a4.49 4.49 0 0 1 2.34-1.974V11.3a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L4.19 13.73a4.5 4.5 0 0 1-2.103-5.861zm16.586 3.864l-5.842-3.37 2.019-1.168a.075.075 0 0 1 .072 0l4.35 2.508a4.5 4.5 0 0 1-.695 8.118V12.43a.787.787 0 0 0-.404-.697zm2.009-3.024l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.14 9.209V6.877a.066.066 0 0 1 .026-.065l4.352-2.505a4.5 4.5 0 0 1 6.679 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
          </svg>
        </div>
        <div className="wf-node-header-text">
          <span className="wf-node-title">{data.label ?? 'OpenAI Analyze'}</span>
          <span className="wf-node-badge wf-node-badge--openai">AI</span>
        </div>
      </div>

      {/* Description */}
      <p className="wf-node-desc">
        {data.description ?? 'Analyzes and transforms data using a GPT model prompt.'}
      </p>

      {/* Model chip */}
      {data.model && (
        <div className="wf-node-meta-row">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
            <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
            <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
          </svg>
          <span className="wf-node-meta-label">{data.model}</span>
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
