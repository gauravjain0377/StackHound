import { Router } from 'express';
import { getWorkspaces, getTasks, getChatHistory, postChatMessage, executeWorkflow } from '../controllers/workspaceController';

const router = Router();

router.get('/', getWorkspaces);
router.get('/:id/tasks', getTasks);
router.get('/:id/chat', getChatHistory);
router.post('/:id/chat', postChatMessage);
router.post('/:id/execute', executeWorkflow);

export default router;
