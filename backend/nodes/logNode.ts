import { z } from 'zod';
import { BaseNode } from '../baseNode';

// ─── Schemas ─────────────────────────────────────────────────────────────────

export const LogNodeInputSchema = z.object({
  /** The message string to log. Must be at least 1 character. */
  message: z.string().min(1, 'Message must not be empty'),
});

export const LogNodeOutputSchema = z.object({
  /** Whether the log operation succeeded. */
  success: z.boolean(),
  /** The exact message that was logged. */
  logged: z.string(),
  /** ISO 8601 timestamp of when the message was logged. */
  timestamp: z.string(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type LogNodeInput = z.infer<typeof LogNodeInputSchema>;
export type LogNodeOutput = z.infer<typeof LogNodeOutputSchema>;

// ─── Node ─────────────────────────────────────────────────────────────────────

/**
 * LogNode — id: "core.log"
 *
 * The simplest possible node. Takes a string message, writes it to stdout
 * via console.info, and returns a success result with the message and timestamp.
 *
 * Input:  { message: string }
 * Output: { success: boolean, logged: string, timestamp: string }
 */
export class LogNode extends BaseNode<LogNodeInput, LogNodeOutput> {
  readonly id = 'core.log';
  readonly name = 'Log Node';
  readonly description = 'Logs a message to the console and returns a success result with a timestamp.';
  readonly inputSchema = LogNodeInputSchema;
  readonly outputSchema = LogNodeOutputSchema;

  protected run(input: LogNodeInput): LogNodeOutput {
    const timestamp = new Date().toISOString();
    console.info(`[LogNode] ${timestamp} — ${input.message}`);

    return {
      success: true,
      logged: input.message,
      timestamp,
    };
  }
}
