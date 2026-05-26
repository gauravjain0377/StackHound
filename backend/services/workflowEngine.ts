import OpenAI from 'openai';
import { ExecutionLog } from '../models/ExecutionLog';

const openai = new OpenAI();

export interface ExecutionResult {
  success: boolean;
  data?: any;
  error?: string;
  logId?: string;
}

export const runWorkflow = async (
  nodes: any[],
  workspaceId: string,
  workflowId?: string,
  initialData?: any
): Promise<ExecutionResult> => {
  const startedAt = new Date();

  // ── 1. Create the log immediately with status 'running' ────────────────────
  const log = await ExecutionLog.create({
    workspaceId,
    workflowId,
    status: 'running',
    startedAt,
    steps: [],
  });

  try {
    if (!nodes || !Array.isArray(nodes)) {
      await ExecutionLog.findByIdAndUpdate(log._id, {
        status: 'failed',
        completedAt: new Date(),
      });
      return { success: false, error: 'Nodes array is required' };
    }

    const collectedSteps: any[] = [];
    let resultData: any = initialData || { message: 'Workflow started' };

    // ── 2. Loop through nodes, capturing input/output/duration per step ────
    for (const node of nodes) {
      console.log(`[Workflow] Executing node: ${node.id} (${node.type})`);
      const nodeStart = Date.now();
      const inputData = JSON.parse(JSON.stringify(resultData)); // snapshot before mutation

      try {
        if (node.type === 'openai') {
          const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content: 'You are an AI assistant processing workflow data. Always respond in valid JSON format.',
              },
              {
                role: 'user',
                content: node.data?.prompt || 'Process the following data: ' + JSON.stringify(resultData),
              },
            ],
            response_format: { type: 'json_object' },
          });
          resultData = JSON.parse(completion.choices[0].message.content || '{}');
        } else if (node.type === 'scraper') {
          resultData = {
            scrapedUrl: node.data?.url,
            status: 'simulated success',
            previous: resultData,
          };
        } else if (node.type === 'trigger' || node.type === 'webhook' || node.type === 'schedule') {
          resultData = {
            triggerData: node.data,
            input: resultData, // merge initialData if any
            timestamp: new Date().toISOString(),
          };
        }

        collectedSteps.push({
          nodeId: node.id,
          nodeName: node.type,
          inputData,
          outputData: resultData,
          duration: Date.now() - nodeStart,
        });
      } catch (nodeError: any) {
        // ── 3. Node failure: record error, mark entire log as failed ────────
        collectedSteps.push({
          nodeId: node.id,
          nodeName: node.type,
          inputData,
          outputData: {},
          error: nodeError.message ?? 'Unknown node error',
          duration: Date.now() - nodeStart,
        });

        await ExecutionLog.findByIdAndUpdate(log._id, {
          status: 'failed',
          completedAt: new Date(),
          steps: collectedSteps,
        });

        return {
          success: false,
          error: `Node "${node.type}" failed: ${nodeError.message}`,
          logId: log._id.toString(),
        };
      }
    }

    // ── 4. All nodes passed — mark as success ─────────────────────────────
    await ExecutionLog.findByIdAndUpdate(log._id, {
      status: 'success',
      completedAt: new Date(),
      steps: collectedSteps,
    });

    return {
      success: true,
      data: resultData,
      logId: log._id.toString(),
    };
  } catch (error: any) {
    console.error('[Workflow] Unexpected error:', error);

    await ExecutionLog.findByIdAndUpdate(log._id, {
      status: 'failed',
      completedAt: new Date(),
    });

    return {
      success: false,
      error: error.message || 'Internal server error',
      logId: log._id.toString(),
    };
  }
};
