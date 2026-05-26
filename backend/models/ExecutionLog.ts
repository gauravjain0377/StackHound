import mongoose, { Schema, Document } from 'mongoose';

export interface IExecutionStep {
  nodeName: string;
  input: any;
  output: any;
  timestamp: Date;
}

export interface IExecutionLog extends Document {
  workspaceId: string;
  workflowName: string;
  status: 'success' | 'failed';
  totalTimeMs: number;
  steps: IExecutionStep[];
  createdAt: Date;
  updatedAt: Date;
}

const ExecutionStepSchema = new Schema(
  {
    nodeName: { type: String, required: true },
    input: { type: Schema.Types.Mixed },
    output: { type: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ExecutionLogSchema = new Schema(
  {
    workspaceId: { type: String, required: true },
    workflowName: { type: String, required: true, default: 'Custom Workflow' },
    status: { type: String, enum: ['success', 'failed'], required: true },
    totalTimeMs: { type: Number, required: true },
    steps: [ExecutionStepSchema],
  },
  { timestamps: true }
);

export const ExecutionLog = mongoose.models.ExecutionLog || mongoose.model<IExecutionLog>('ExecutionLog', ExecutionLogSchema);
