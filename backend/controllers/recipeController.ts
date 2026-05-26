import { Request, Response } from 'express';
import { Recipe } from '../models/Recipe';

// ─── GET /api/recipes ─────────────────────────────────────────────────────────
export const getRecipes = async (_req: Request, res: Response): Promise<any> => {
  try {
    const recipes = await Recipe.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: recipes });
  } catch (error: any) {
    console.error('Error fetching recipes:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch recipes' });
  }
};

// ─── GET /api/recipes/:id ─────────────────────────────────────────────────────
export const getRecipeById = async (req: Request, res: Response): Promise<any> => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'Recipe not found' });
    }
    return res.status(200).json({ success: true, data: recipe });
  } catch (error: any) {
    console.error('Error fetching recipe:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch recipe' });
  }
};

// ─── POST /api/recipes ────────────────────────────────────────────────────────
export const createRecipe = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description, icon, flowData } = req.body;

    if (!title || !description || !icon) {
      return res.status(400).json({ success: false, error: 'title, description, and icon are required' });
    }

    const recipe = await Recipe.create({
      title,
      description,
      icon,
      flowData: flowData ?? { nodes: [], edges: [] },
    });

    return res.status(201).json({ success: true, data: recipe });
  } catch (error: any) {
    console.error('Error creating recipe:', error);
    return res.status(500).json({ success: false, error: 'Failed to create recipe' });
  }
};
