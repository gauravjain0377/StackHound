import { Router } from 'express';
import { executeWebhook } from '../controllers/webhookController';

const router = Router();

router.post('/execute/:recipeId', executeWebhook);

export default router;
