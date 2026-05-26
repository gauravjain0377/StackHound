'use client';

import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback, useState } from 'react';

import { TriggerNode } from './nodes/TriggerNode';
import { ScraperNode } from './nodes/ScraperNode';
import { OpenAINode } from './nodes/OpenAINode';

// Register custom node types
const nodeTypes = {
  trigger: TriggerNode,
  scraper: ScraperNode,
  openai: OpenAINode,
};

// ── Initial demo nodes ────────────────────────────────────────────────────────
const initialNodes: Node[] = [
  {
    id: 'trigger-1',
    type: 'trigger',
    position: { x: 80, y: 220 },
    data: {
      label: 'Cron Trigger',
      description: 'Fires every 6 hours to kick off the scraping pipeline.',
      schedule: 'Every 6 hours',
    },
  },
  {
    id: 'scraper-1',
    type: 'scraper',
    position: { x: 420, y: 160 },
    data: {
      label: 'Web Scraper',
      description: 'Fetches the latest Stack Overflow developer survey page.',
      url: 'stackoverflow.com/survey',
      method: 'GET',
    },
  },
  {
    id: 'scraper-2',
    type: 'scraper',
    position: { x: 420, y: 320 },
    data: {
      label: 'GitHub Trends',
      description: 'Pulls trending repositories for language trend analysis.',
      url: 'github.com/trending',
      method: 'GET',
    },
  },
  {
    id: 'openai-1',
    type: 'openai',
    position: { x: 760, y: 220 },
    data: {
      label: 'Trend Analyzer',
      description: 'Summarizes technology trends and generates actionable insights.',
      model: 'gpt-4o',
    },
  },
];

// ── Initial demo edges ────────────────────────────────────────────────────────
const initialEdges: Edge[] = [
  {
    id: 'e1',
    source: 'trigger-1',
    target: 'scraper-1',
    animated: true,
    style: { stroke: '#06b6d4', strokeWidth: 1.5 },
  },
  {
    id: 'e2',
    source: 'trigger-1',
    target: 'scraper-2',
    animated: true,
    style: { stroke: '#06b6d4', strokeWidth: 1.5 },
  },
  {
    id: 'e3',
    source: 'scraper-1',
    target: 'openai-1',
    animated: true,
    style: { stroke: '#06b6d4', strokeWidth: 1.5 },
  },
  {
    id: 'e4',
    source: 'scraper-2',
    target: 'openai-1',
    animated: true,
    style: { stroke: '#06b6d4', strokeWidth: 1.5 },
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export function WorkflowCanvas() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isExecuting, setIsExecuting] = useState(false);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            animated: true,
            style: { stroke: '#06b6d4', strokeWidth: 1.5 },
          },
          eds,
        ),
      ),
    [setEdges],
  );

  const handleRunWorkflow = async () => {
    setIsExecuting(true);
    
    // Parse order based on edges (simple topological approach for this pipeline)
    // Find trigger node(s)
    const triggerNodes = nodes.filter(n => n.type === 'trigger');
    
    // For a complex DAG we'd do a full topological sort, but we can do a simple BFS here:
    const orderedNodes: Node[] = [];
    const visited = new Set<string>();
    const queue = [...triggerNodes];
    
    while(queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current.id)) continue;
      
      visited.add(current.id);
      orderedNodes.push(current);
      
      // Find children
      const childrenEdges = edges.filter(e => e.source === current.id);
      for (const edge of childrenEdges) {
        const targetNode = nodes.find(n => n.id === edge.target);
        if (targetNode && !visited.has(targetNode.id)) {
          // If we want strict topological, we should ensure all in-edges are resolved. 
          // For this requirement, simple BFS is sufficient to order Trigger -> Scraper -> OpenAI
          queue.push(targetNode);
        }
      }
    }

    try {
      const response = await fetch('http://localhost:3001/api/workspace/default/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nodes: orderedNodes })
      });
      
      if (!response.ok) {
        throw new Error('Failed to execute workflow');
      }
      
      const result = await response.json();
      console.log('Workflow executed successfully:', result);
      // Could show a toast or alert here
    } catch (error) {
      console.error('Error running workflow:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="wf-canvas-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.25}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        style={{ background: '#09090b' }}
      >
        <Panel position="top-right" style={{ margin: '16px' }}>
          <button 
            className="wf-topbar-btn wf-topbar-btn--primary" 
            aria-label="Run workflow"
            onClick={handleRunWorkflow}
            disabled={isExecuting}
            style={{ 
              padding: '8px 16px', 
              fontSize: '13px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              opacity: isExecuting ? 0.7 : 1,
              cursor: isExecuting ? 'not-allowed' : 'pointer'
            }}
          >
            {isExecuting ? (
              <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)"></circle>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
            {isExecuting ? 'Running...' : 'Run Workflow'}
          </button>
        </Panel>

        {/* Blueprint dot-grid background */}
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.2}
          color="#27272a"
        />

        {/* Glassmorphism controls */}
        <Controls
          className="wf-controls"
          showInteractive={false}
        />

        {/* MiniMap */}
        <MiniMap
          className="wf-minimap"
          nodeColor={(n) => {
            if (n.type === 'trigger') return '#eab308';
            if (n.type === 'scraper') return '#06b6d4';
            if (n.type === 'openai') return '#10b981';
            return '#52525b';
          }}
          maskColor="rgba(9,9,11,0.85)"
        />
      </ReactFlow>
    </div>
  );
}
