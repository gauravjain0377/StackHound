import { BaseNode } from './baseNode';

// Using `any` here is intentional: the registry stores nodes of heterogeneous
// generic types. Callers who retrieve a node via getNode() are responsible for
// casting to the correct generic signature for their use case.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyNode = BaseNode<any, any>;

export interface NodeListItem {
  id: string;
  name: string;
  description: string;
}

/**
 * NodeRegistry
 *
 * The central brain of StackHound. Maintains a Map of all registered nodes
 * keyed by their unique `id`. Acts as a singleton — import `nodeRegistry`
 * rather than instantiating this class directly.
 *
 * Responsibilities:
 *   - Store nodes by ID at startup (registerNode)
 *   - Retrieve a node by ID at runtime (getNode)
 *   - Expose the full list for introspection / dashboard display (listNodes)
 */
export class NodeRegistry {
  private readonly nodes: Map<string, AnyNode> = new Map();

  /**
   * Register a node with the registry.
   * Throws if a node with the same ID is already registered
   * to prevent accidental overwrites.
   */
  registerNode(node: AnyNode): void {
    if (this.nodes.has(node.id)) {
      throw new Error(
        `[NodeRegistry] A node with id "${node.id}" is already registered. IDs must be unique.`
      );
    }

    this.nodes.set(node.id, node);
    console.info(`[NodeRegistry] ✓ Registered "${node.name}" (id: ${node.id})`);
  }

  /**
   * Retrieve a node by its unique ID.
   * Returns undefined if no node is found — callers should check before use.
   */
  getNode(id: string): AnyNode | undefined {
    return this.nodes.get(id);
  }

  /**
   * Returns true if a node with the given ID exists in the registry.
   */
  hasNode(id: string): boolean {
    return this.nodes.has(id);
  }

  /**
   * Returns a lightweight summary of all registered nodes.
   * Useful for the /health endpoint and the dashboard.
   *
   * The shape is intentionally minimal — only the fields safe
   * to expose over the public API.
   */
  listNodes(): NodeListItem[] {
    return Array.from(this.nodes.values()).map((node) => ({
      id: node.id,
      name: node.name,
      description: node.description,
    }));
  }

  /** Total number of registered nodes. */
  get size(): number {
    return this.nodes.size;
  }
}

/**
 * Singleton registry instance.
 * Import this throughout the codebase — never instantiate NodeRegistry directly.
 */
export const nodeRegistry = new NodeRegistry();
