'use client';

import { Handle, Position, NodeProps } from 'reactflow';
import { useState } from 'react';

export interface WebhookTriggerNodeData {
  label?: string;
  description?: string;
  webhookUrl?: string; // Automatically passed in or constructed from recipeId
}

export function WebhookTriggerNode({ data, selected, id }: NodeProps<WebhookTriggerNodeData>) {
  const [copied, setCopied] = useState(false);
  
  // Just a visual representation. The actual URL would map to the recipe ID.
  // E.g., http://localhost:3001/api/webhooks/execute/<recipe_id>
  const url = data.webhookUrl || `https://api.stackhound.dev/v1/webhook/${id.split('-')[1] || 'demo'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`wf-node wf-node--trigger${selected ? ' wf-node--selected' : ''}`} style={{ width: '280px' }}>
      <div className="wf-node-accent wf-node-accent--trigger" />

      <div className="wf-node-header">
        <div className="wf-node-icon wf-node-icon--trigger">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </div>
        <div className="wf-node-header-text">
          <span className="wf-node-title">{data.label ?? 'Webhook Trigger'}</span>
          <span className="wf-node-badge wf-node-badge--trigger">WEBHOOK</span>
        </div>
      </div>

      <p className="wf-node-desc">
        {data.description ?? 'Fires workflow immediately when this URL receives a POST request.'}
      </p>

      {/* Webhook URL Copy box */}
      <div style={{ marginTop: '12px' }}>
        <p style={{ fontSize: '10px', fontWeight: 600, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
          Endpoint URL
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid #27272a',
          borderRadius: '6px',
          padding: '4px',
        }}>
          <div style={{
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '11px',
            color: '#a1a1aa',
            fontFamily: 'var(--font-mono)',
            padding: '4px 8px',
          }}>
            {url}
          </div>
          <button
            onClick={handleCopy}
            style={{
              padding: '6px',
              background: 'transparent',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: copied ? '#10b981' : '#71717a',
            }}
            title="Copy URL"
          >
            {copied ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="wf-handle wf-handle--source" />
    </div>
  );
}
