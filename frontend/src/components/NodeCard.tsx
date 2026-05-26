import type { CSSProperties } from 'react';
import type { NodeSummary } from '@/lib/api';

// ─── Types ─────────────────────────────────────────────────────────────────────

export type NodeStatus = 'active' | 'inactive' | 'error';
export type NodeType = 'Core' | 'IO' | 'AI' | 'Data' | string;

export interface NodeCardData extends NodeSummary {
  type?: NodeType;
  status?: NodeStatus;
  /** Keys from the node's Zod input schema */
  inputKeys?: string[];
  /** Keys from the node's Zod output schema */
  outputKeys?: string[];
  /** True when this node is confirmed registered in the live backend registry */
  isRegistered?: boolean;
}

interface NodeCardProps extends NodeCardData {
  onClick?: () => void;
  style?: CSSProperties;
}

// ─── Type → CSS class map ──────────────────────────────────────────────────────

const TYPE_CLASS: Record<string, string> = {
  Core: 'node-type-core',
  IO:   'node-type-io',
  AI:   'node-type-ai',
  Data: 'node-type-data',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * NodeCard
 *
 * A sharp, high-contrast block representing a single StackHound node.
 *
 * Design:
 *  - Dark navy background with a subtle border
 *  - On hover: electric-blue border + outer glow + 2px top accent line
 *  - Shows node ID in monospace, type badge, status dot (if registered)
 *  - Displays truncated description and input/output schema keys
 */
export function NodeCard({
  id,
  name,
  description,
  type = 'Core',
  status = 'inactive',
  inputKeys = [],
  outputKeys = [],
  isRegistered = false,
  onClick,
  style,
}: NodeCardProps) {
  const typeClass = TYPE_CLASS[type] ?? 'node-type-core';
  const hasSchema = inputKeys.length > 0 || outputKeys.length > 0;

  return (
    <div
      id={`node-card-${id.replace(/\./g, '-')}`}
      className="node-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${name} — ${id}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={style}
    >
      {/* ── Top row: ID + badges ─────────────────────────────────── */}
      <div className="node-card-top">
        <code className="node-card-id">{id}</code>

        <div className="node-card-badges">
          {isRegistered && (
            <span
              className={`node-card-status-dot ${status}`}
              title={isRegistered ? `Registered — ${status}` : 'Not registered'}
            />
          )}
          <span className={`node-card-type ${typeClass}`}>{type}</span>
        </div>
      </div>

      {/* ── Name + description ───────────────────────────────────── */}
      <div className="node-card-body">
        <h3 className="node-card-name">{name}</h3>
        <p className="node-card-desc">{description}</p>
      </div>

      {/* ── Schema keys ─────────────────────────────────────────── */}
      {hasSchema && (
        <>
          <div className="node-card-divider" />
          <div className="node-card-schema">
            {inputKeys.length > 0 && (
              <div className="node-schema-row">
                <span className="node-schema-label">IN</span>
                <div className="node-schema-keys">
                  {inputKeys.map((k) => (
                    <span key={k} className="node-schema-key">{k}</span>
                  ))}
                </div>
              </div>
            )}
            {outputKeys.length > 0 && (
              <div className="node-schema-row">
                <span className="node-schema-label">OUT</span>
                <div className="node-schema-keys">
                  {outputKeys.map((k) => (
                    <span key={k} className="node-schema-key">{k}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
