import { Request, Response } from 'express';
import { Workspace } from '../models/Workspace';
import { Recipe } from '../models/Recipe';
import { runWorkflow } from '../services/workflowEngine';

export const executeWebhook = async (req: Request, res: Response): Promise<any> => {
  try {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || typeof apiKey !== 'string') {
      return res.status(401).json({ success: false, error: 'Unauthorized: Missing or invalid x-api-key header' });
    }

    const workspace = await Workspace.findOne({ apiKey });
    if (!workspace) {
      return res.status(401).json({ success: false, error: 'Unauthorized: Invalid API Key' });
    }

    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'Recipe/Workflow not found' });
    }

    if (!recipe.webhookEnabled) {
      return res.status(403).json({ success: false, error: 'Webhook trigger is not enabled for this recipe' });
    }

    // Pass the webhook body as initial data to the workflow
    const initialData = req.body;
    
    // Execute asynchronously (we could wait for it, or return immediately. Here we wait for simplicity)
    const result = await runWorkflow(recipe.flowData.nodes, workspace._id as string, recipe._id as string, initialData);

    if (!result.success) {
       return res.status(500).json(result);
    }
    
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Webhook execution error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
