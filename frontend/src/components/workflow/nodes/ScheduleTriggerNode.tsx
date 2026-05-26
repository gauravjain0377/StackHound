'use client';

import { Handle, Position, NodeProps } from 'reactflow';

export interface ScheduleTriggerNodeData {
  label?: string;
  description?: string;
  schedule?: string;
  onChange?: (val: string) => void;
}

export function ScheduleTriggerNode({ data, selected }: NodeProps<ScheduleTriggerNodeData>) {
  
  // Available cron presets
  const schedules = [
    { label: 'Every hour', value: '0 * * * *' },
    { label: 'Daily at 8 AM', value: '0 8 * * *' },
    { label: 'Daily at midnight', value: '0 0 * * *' },
    { label: 'Weekly on Monday', value: '0 9 * * 1' },
    { label: 'Weekly on Friday', value: '0 17 * * 5' }
  ];

  const currentSchedule = data.schedule || '0 8 * * *';

  return (
    <div className={`wf-node wf-node--trigger${selected ? ' wf-node--selected' : ''}`} style={{ width: '240px' }}>
      <div className="wf-node-accent wf-node-accent--trigger" />

      <div className="wf-node-header">
        <div className="wf-node-icon wf-node-icon--trigger">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div className="wf-node-header-text">
          <span className="wf-node-title">{data.label ?? 'Schedule Trigger'}</span>
          <span className="wf-node-badge wf-node-badge--trigger">CRON</span>
        </div>
      </div>

      <p className="wf-node-desc">
        {data.description ?? 'Fires workflow autonomously based on a recurring cron schedule.'}
      </p>

      {/* Schedule Dropdown */}
      <div style={{ marginTop: '12px' }}>
        <p style={{ fontSize: '10px', fontWeight: 600, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
          Execution Time
        </p>
        <select
          value={currentSchedule}
          onChange={(e) => data.onChange?.(e.target.value)}
          className="nodrag" // Prevents dragging node when interacting with select
          style={{
            width: '100%',
            background: '#09090b',
            border: '1px solid #27272a',
            color: '#e4e4e7',
            padding: '6px 8px',
            borderRadius: '6px',
            fontSize: '12px',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          {schedules.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label} ({s.value})
            </option>
          ))}
        </select>
      </div>

      <Handle type="source" position={Position.Right} className="wf-handle wf-handle--source" />
    </div>
  );
}
