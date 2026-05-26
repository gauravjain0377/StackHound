import mongoose, { Schema, Document, Types } from 'mongoose';

// ─── Step Sub-Schema ──────────────────────────────────────────────────────────

export interface IExecutionStep {
  nodeId: string;
  nodeName: string;
  inputData: Record<string, any>;
  outputData: Record<string, any>;
  error?: string;
  duration: number; // milliseconds
}

// ─── ExecutionLog Interface ───────────────────────────────────────────────────

export interface IExecutionLog extends Document {
  workspaceId: Types.ObjectId | string;
  workflowId?: Types.ObjectId | string;
  status: 'running' | 'success' | 'failed';
  startedAt: Date;
  completedAt?: Date;
  steps: IExecutionStep[];
  createdAt: Date;
  updatedAt: Date;
}

// ─── Step Sub-Schema Definition ───────────────────────────────────────────────

const ExecutionStepSchema = new Schema<IExecutionStep>(
  {
    nodeId:     { type: String, required: true },
    nodeName:   { type: String, required: true },
    inputData:  { type: Schema.Types.Mixed, default: {} },
    outputData: { type: Schema.Types.Mixed, default: {} },
    error:      { type: String },
    duration:   { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

// ─── ExecutionLog Schema Definition ──────────────────────────────────────────

const ExecutionLogSchema = new Schema<IExecutionLog>(
  {
    workspaceId: { type: Schema.Types.Mixed, required: true },
    workflowId:  { type: Schema.Types.ObjectId, ref: 'Workflow', required: false },
    status:      { type: String, enum: ['running', 'success', 'failed'], required: true, default: 'running' },
    startedAt:   { type: Date, required: true, default: Date.now },
    completedAt: { type: Date },
    steps:       { type: [ExecutionStepSchema], default: [] },
  },
  { timestamps: true }
);

export const ExecutionLog =
  mongoose.models.ExecutionLog ||
  mongoose.model<IExecutionLog>('ExecutionLog', ExecutionLogSchema);
