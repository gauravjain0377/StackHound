import mongoose, { Schema, Document } from 'mongoose';

export interface IChatHistory extends Document {
  workspaceId: mongoose.Types.ObjectId;
  role: 'user' | 'system';
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatHistorySchema: Schema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
    role: { type: String, enum: ['user', 'system'], required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export const ChatHistory =
  mongoose.models.ChatHistory || mongoose.model<IChatHistory>('ChatHistory', ChatHistorySchema);
