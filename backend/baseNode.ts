import { ZodSchema, ZodError } from 'zod';

/**
 * BaseNode<TInput, TOutput>
 *
 * Abstract base class that every StackHound node must extend.
 * Enforces a contract: every node declares its own Zod schemas for
 * input and output, and the public `execute()` method guarantees
 * input is validated before the core logic (`run()`) is ever called.
 *
 * Subclasses must implement:
 *   - id          — unique identifier (e.g. "core.log")
 *   - name        — human-readable label
 *   - description — short summary of what the node does
 *   - inputSchema — Zod schema that incoming data must satisfy
 *   - outputSchema — Zod schema describing the return shape
 *   - run()       — core logic, receives already-validated typed input
 */
export abstract class BaseNode<TInput, TOutput> {
  /** Unique identifier used to look up this node in the registry. */
  abstract readonly id: string;

  /** Human-readable name shown in the dashboard. */
  abstract readonly name: string;

  /** Short description of what this node does. */
  abstract readonly description: string;

  /** Zod schema that all incoming data must conform to. */
  abstract readonly inputSchema: ZodSchema<TInput>;

  /** Zod schema describing the shape this node will always return. */
  abstract readonly outputSchema: ZodSchema<TOutput>;

  /**
   * Public entry point for executing this node.
   *
   * 1. Validates `rawInput` against `inputSchema`.
   * 2. Throws a descriptive error if validation fails — execution is aborted.
   * 3. Delegates to `run()` with the typed, validated input.
   *
   * @param rawInput - Unknown data coming from the pipeline or caller
   * @returns Typed output from `run()`
   * @throws Error if Zod validation fails
   */
  execute(rawInput: unknown): TOutput {
    const result = this.inputSchema.safeParse(rawInput);

    if (!result.success) {
      const issues = (result.error as ZodError).issues
        .map((issue) => `  • ${issue.path.length ? issue.path.join('.') + ': ' : ''}${issue.message}`)
        .join('\n');

      throw new Error(
        `[${this.name}] Input validation failed:\n${issues}`
      );
    }

    return this.run(result.data);
  }

  /**
   * Core node logic. Receives validated, strongly-typed input.
   * Must be implemented by every concrete node class.
   *
   * @param input - Validated input that conforms to `inputSchema`
   * @returns Output that must conform to `outputSchema`
   */
  protected abstract run(input: TInput): TOutput;
}
