import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IWorkspace extends Document {
  name: string;
  memberIds: string[];
  apiKey: string; // Used to authenticate webhook requests via x-api-key header
  createdAt: Date;
  updatedAt: Date;
}

const WorkspaceSchema: Schema = new Schema(
  {
    name:      { type: String, required: true },
    memberIds: { type: [String], default: [] },
    apiKey:    { type: String, required: true, unique: true, default: () => uuidv4() },
  },
  { timestamps: true }
);

// Prevent mongoose from compiling the model multiple times in dev
export const Workspace =
  mongoose.models.Workspace || mongoose.model<IWorkspace>('Workspace', WorkspaceSchema);
