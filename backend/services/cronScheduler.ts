import cron from 'node-cron';
import { Recipe } from '../models/Recipe';
import { Workspace } from '../models/Workspace';
import { runWorkflow } from './workflowEngine';

export const initCronScheduler = async () => {
  console.log('[Cron] Initializing scheduler...');
  
  try {
    // 1. Fetch all recipes that have a schedule set
    const scheduledRecipes = await Recipe.find({ schedule: { $nin: [null, ''] } });
    
    if (scheduledRecipes.length === 0) {
      console.log('[Cron] No scheduled recipes found.');
      return;
    }

    // 2. We need a default workspace to attribute the cron jobs to (since they are autonomous).
    // In a multi-tenant app, the recipe would belong to a workspace.
    // Here we'll just grab the first workspace.
    const defaultWorkspace = await Workspace.findOne();
    const workspaceId = defaultWorkspace ? defaultWorkspace._id.toString() : 'default';

    // 3. Register each cron job
    for (const recipe of scheduledRecipes) {
      if (!recipe.schedule) continue;
      
      const isValid = cron.validate(recipe.schedule);
      if (!isValid) {
        console.warn(`[Cron] Invalid cron expression "${recipe.schedule}" for recipe ${recipe._id}. Skipping.`);
        continue;
      }

      console.log(`[Cron] Registering schedule "${recipe.schedule}" for recipe: ${recipe.title}`);
      
      cron.schedule(recipe.schedule, async () => {
        console.log(`[Cron] Firing scheduled workflow: ${recipe.title}`);
        try {
          const initialData = { triggeredBy: 'cron', timestamp: new Date().toISOString() };
          await runWorkflow(recipe.flowData.nodes, workspaceId, recipe._id as string, initialData);
        } catch (err) {
          console.error(`[Cron] Error executing workflow ${recipe._id}:`, err);
        }
      });
    }
  } catch (error) {
    console.error('[Cron] Failed to initialize scheduler:', error);
  }
};
