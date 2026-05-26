# StackHound

A neo-futuristic full-stack platform for visual node orchestration and pipeline execution.

## Project Architecture

The repository is structured as a monorepo containing two distinct applications:

*   **`backend/`**: Node.js + Express server written in TypeScript.
*   **`frontend/`**: Next.js 14 application (App Router) with Tailwind CSS v4.

Both directories maintain their own `package.json` and `node_modules` for strict isolation, avoiding common monorepo dependency hoisting issues.

## Features Built

### Backend
*   **NodeRegistry (Singleton)**: An in-memory Map-based registry to store and retrieve executable nodes by ID.
*   **BaseNode (Abstract Class)**: Provides a generic type-safe structure (`TInput`, `TOutput`) for all nodes, enforcing automatic Zod schema validation before execution.
*   **LogNode (Implementation)**: A concrete core node that logs to the console and returns an execution summary.
*   **API Endpoints**: 
    *   `GET /health`: Detailed health checks and basic registry metrics.
    *   `GET /api/nodes`: Exposes the registered nodes list for frontend syncing.

### Frontend
*   **Design System**: A strict neo-futuristic palette (deep blacks, dark navy, tech-blues) using Tailwind v4 CSS-first configuration (`@theme` in `globals.css`).
*   **Dashboard Shell**: A sleek, sticky sidebar navigation layout with active route tracking and SVG iconography.
*   **Home Dashboard**: A reference-inspired hero greeting with a command-palette style input, quick action lists, and stats.
*   **Node Playground**: A visual grid of `NodeCard` components showcasing the node catalogue, complete with client-side filtering and real-time backend synchronization (registered nodes pulse green).

## Setup & Execution

### Prerequisites
*   Node.js v18+
*   npm

### Installation

1.  Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```
2.  Install frontend dependencies:
    ```bash
    cd frontend
    npm install
    ```

### Running Locally

You'll need two terminal windows to run the full stack:

**Terminal 1 (Backend - Port 3001)**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend - Port 3000)**
```bash
cd frontend
npm run dev
```

Open `http://localhost:3000` in your browser.

## Type Safety

The application enforces a strict type contract between the frontend and backend. 
The `NodeListItem` interface exported by the backend `NodeRegistry` maps precisely to the `NodeSummary` interface in the frontend's API client, which is subsequently extended by the UI components (e.g., `NodeCardData`).

## Code Quality

Both projects are configured with Prettier and strict ESLint rules (ESLint v8 for backend, ESLint v9 Flat Config for frontend) to ensure a consistent, professional codebase.
