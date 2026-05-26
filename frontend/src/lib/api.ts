/** Base URL for the StackHound backend. Reads from NEXT_PUBLIC_API_URL env var. */
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

// ─── Types ─────────────────────────────────────────────────────────────────────

/** A node summary as returned by GET /api/nodes */
export interface NodeSummary {
  id: string;
  name: string;
  description: string;
}

export interface NodesResponse {
  nodes: NodeSummary[];
  total: number;
  timestamp: string;
}

// ─── Fetchers ──────────────────────────────────────────────────────────────────

/**
 * Fetch all registered nodes from the backend registry.
 *
 * @throws Error if the request fails or the backend is unreachable.
 */
export async function fetchNodes(): Promise<NodesResponse> {
  const res = await fetch(`${API_BASE}/api/nodes`, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`GET /api/nodes → ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<NodesResponse>;
}
