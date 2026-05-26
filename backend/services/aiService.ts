import OpenAI from 'openai';

// Initialize the OpenAI API client
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn('Warning: OPENAI_API_KEY is not set in the environment variables.');
}

const openai = new OpenAI({
  apiKey: apiKey || '',
});

export interface ActionTask {
  title: string;
  metric: string;
}

/**
 * Uses OpenAI API to analyze website text and return 4 actionable tasks.
 * 
 * @param websiteText The scraped text from the user's website
 * @returns A strictly typed array of ActionTask objects
 */
export async function generateActionTasks(websiteText: string): Promise<ActionTask[]> {
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is missing. Cannot generate tasks.');
  }

  const prompt = `
You are an expert B2B SaaS analyst. Read the following website text and generate exactly 4 actionable tasks for the user.

You must identify and create tasks based on:
1. 2 real competitors they should analyze.
2. 5 potential roundup articles or directories they should pitch to.
3. 10 likely SEO issues based on their industry.
4. Standard AI platforms they might be missing from.

Format the output as a strict JSON object containing a single key "tasks".
The "tasks" key must contain an array of exactly 4 objects.
Each object in the array must have exactly two keys:
- "title": A short, actionable string (e.g., "Analyze 2 Competitors: [Comp1], [Comp2]").
- "metric": A short string representing the target metric or status (e.g., "0/2 Analyzed", "0/5 Pitched").

Here is the website text to analyze:
"""
${websiteText}
"""
  `.trim();

  try {
    // We use gpt-4o-mini as it is the standard for fast, structured tasks
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert B2B SaaS analyst that outputs strict JSON.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
    });

    const responseText = response.choices[0]?.message?.content;
    
    if (!responseText) {
      throw new Error('OpenAI returned an empty response.');
    }
    
    // Parse the JSON object returned by OpenAI
    const parsed = JSON.parse(responseText);
    const tasks: ActionTask[] = parsed.tasks;
    
    // Ensure we got the expected array structure
    if (!Array.isArray(tasks)) {
      throw new Error('OpenAI did not return a valid "tasks" JSON array.');
    }
    
    return tasks.slice(0, 4); // Guarantee max 4 items
  } catch (error: any) {
    console.error('Error generating tasks from OpenAI:', error);
    throw new Error(`Failed to generate action tasks: ${error.message}`);
  }
}
