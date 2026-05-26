import { Request, Response } from 'express';
import { Workspace } from '../models/Workspace';
import { Task } from '../models/Task';
import { ChatHistory } from '../models/ChatHistory';
import { scrapeUrlText } from '../utils/scraper';
import { generateActionTasks } from '../services/aiService';
export const getWorkspaces = async (_req: Request, res: Response) => {
  try {
    const workspaces = await Workspace.find({});
    res.status(200).json({ success: true, data: workspaces });
  } catch (error) {
    console.error('Error fetching workspaces:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch workspaces' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tasks = await Task.find({ workspaceId: id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch tasks' });
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Fetch last 20 messages, sorted by createdAt ascending to render in chronological order
    const chat = await ChatHistory.find({ workspaceId: id })
      .sort({ createdAt: -1 })
      .limit(20);
      
    res.status(200).json({ success: true, data: chat.reverse() });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch chat history' });
  }
};

export const postChatMessage = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id: workspaceId } = req.params;
    // We expect the frontend to send the URL in the "text" field or "url" field
    const url = req.body.url || req.body.text;
    const role = req.body.role || 'user';

    if (!url) {
      return res.status(400).json({ success: false, error: 'URL is required' });
    }

    // 1. Save the user's initial prompt (the URL)
    const userMessage = new ChatHistory({
      workspaceId,
      role,
      text: url,
    });
    await userMessage.save();

    // 2. Call the scraper.ts utility to get the website text
    const websiteText = await scrapeUrlText(url);

    // Check if scraper returned a controlled error string
    if (websiteText.startsWith('Error:')) {
      const systemError = new ChatHistory({
        workspaceId,
        role: 'system',
        text: websiteText,
      });
      await systemError.save();
      return res.status(400).json({ success: false, error: websiteText });
    }

    // 3. Pass that text into the aiService.ts to get the array of JSON tasks
    const generatedTasks = await generateActionTasks(websiteText);

    // 4. Map over that JSON array and save each item to the MongoDB Task schema
    const savedTasks = await Promise.all(
      generatedTasks.map(async (task) => {
        const newTask = new Task({
          title: task.title,
          metric: task.metric,
          status: 'completed', // Using default completed status from schema
          workspaceId,
        });
        return await newTask.save();
      })
    );

    // 5. Save a system success message to the ChatHistory schema
    const systemSuccess = new ChatHistory({
      workspaceId,
      role: 'system',
      text: `Successfully analyzed the website and created ${savedTasks.length} tasks.`,
    });
    await systemSuccess.save();

    // 6. Return the newly created tasks in the API response
    return res.status(201).json({ success: true, data: savedTasks });
  } catch (error: any) {
    console.error('Error in postChatMessage flow:', error);
    
    // Attempt to log the error to chat history
    try {
      const systemError = new ChatHistory({
        workspaceId: req.params.id,
        role: 'system',
        text: `Failed to process request: ${error.message}`,
      });
      await systemError.save();
    } catch (dbError) {
      console.error('Could not save error to ChatHistory:', dbError);
    }

    return res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
};

import { runWorkflow } from '../services/workflowEngine';

export const executeWorkflow = async (req: Request, res: Response): Promise<any> => {
  const workspaceId = req.params.id || 'default';
  const workflowId  = req.body.workflowId ?? undefined;  
  const { nodes } = req.body;

  const result = await runWorkflow(nodes, workspaceId, workflowId);

  if (!result.success) {
    return res.status(result.error === 'Nodes array is required' ? 400 : 500).json(result);
  }

  return res.status(200).json(result);
};

