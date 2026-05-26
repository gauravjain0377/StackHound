import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { nodeRegistry } from './nodeRegistry';
import { LogNode } from './nodes/logNode';

import mongoose from 'mongoose';
import workspaceRoutes from './routes/workspaceRoutes';
// ─── Node Registration ────────────────────────────────────────────────────────
// All nodes must be registered here at startup before the server begins
// accepting requests. This ensures the registry is fully populated.
nodeRegistry.registerNode(new LogNode());

// ─── Database Connection ──────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/stackhound';
mongoose
  .connect(MONGO_URI)
  .then(() => console.info(`📦 Connected to MongoDB at ${MONGO_URI}`))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ─── App Setup ────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT ?? 3001;

// ─── Security & Parsing Middleware ────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/workspace', workspaceRoutes);

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'stackhound-backend',
    timestamp: new Date().toISOString(),
    registry: {
      nodeCount: nodeRegistry.size,
      nodes: nodeRegistry.listNodes(),
    },
    dbConnected: mongoose.connection.readyState === 1,
  });
});

app.get('/api/nodes', (_req: Request, res: Response) => {
  res.status(200).json({
    nodes: nodeRegistry.listNodes(),
    total: nodeRegistry.size,
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.info(`🚀 StackHound backend running on http://localhost:${PORT}`);
  console.info(`🧠 Registry loaded with ${nodeRegistry.size} node(s)`);
});

export default app;
