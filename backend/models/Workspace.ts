import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkspace extends Document {
  name: string;
  memberIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

const WorkspaceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    memberIds: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Prevent mongoose from compiling the model multiple times in dev
export const Workspace =
  mongoose.models.Workspace || mongoose.model<IWorkspace>('Workspace', WorkspaceSchema);
