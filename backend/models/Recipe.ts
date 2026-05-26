import mongoose, { Schema, Document } from 'mongoose';

// ─── React Flow Shape Interfaces ──────────────────────────────────────────────

export interface IFlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, any>;
}

export interface IFlowEdge {
  id: string;
  source: string;
  target: string;
  [key: string]: any;
}

export interface IFlowData {
  nodes: IFlowNode[];
  edges: IFlowEdge[];
}

// ─── Recipe Interface ─────────────────────────────────────────────────────────

export interface IRecipe extends Document {
  title: string;
  description: string;
  icon: string;
  flowData: IFlowData;
  schedule?: string;        // cron expression e.g. '0 8 * * *'
  webhookEnabled: boolean;  // whether a webhook trigger is active
  createdAt: Date;
  updatedAt: Date;
}

// ─── Recipe Schema ────────────────────────────────────────────────────────────

const RecipeSchema = new Schema<IRecipe>(
  {
    title:          { type: String, required: true, trim: true },
    description:    { type: String, required: true, trim: true },
    icon:           { type: String, required: true, default: 'default' },
    flowData:       { type: Schema.Types.Mixed, required: true, default: { nodes: [], edges: [] } },
    schedule:       { type: String, default: null },        // cron string or null
    webhookEnabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Recipe =
  mongoose.models.Recipe ||
  mongoose.model<IRecipe>('Recipe', RecipeSchema);
