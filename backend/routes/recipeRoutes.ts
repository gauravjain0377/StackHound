import { Router } from 'express';
import { getRecipes, getRecipeById, createRecipe } from '../controllers/recipeController';

const router = Router();

router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.post('/', createRecipe);

export default router;
