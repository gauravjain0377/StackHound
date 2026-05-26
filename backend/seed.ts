import mongoose from 'mongoose';
import { Workspace } from './models/Workspace';
import { Task } from './models/Task';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/stackhound';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('📦 Connected to MongoDB');

    // Clear existing
    await Workspace.deleteMany({});
    await Task.deleteMany({});

    // Create a dummy workspace
    const workspace = await Workspace.create({
      name: 'gauravjain',
      memberIds: ['user_123'],
    });

    console.log(`✅ Created Workspace: ${workspace._id}`);

    // Create tasks
    const tasks = [
      {
        title: 'Your real competitors: 2 brands',
        metric: '2 brands',
        status: 'completed',
        workspaceId: workspace._id,
      },
      {
        title: 'Get listed on 5 roundup articles',
        metric: '5 pitches',
        status: 'completed',
        workspaceId: workspace._id,
      },
      {
        title: 'Fix 10 SEO issues we found on your site',
        metric: '10 issues',
        status: 'completed',
        workspaceId: workspace._id,
      },
      {
        title: 'You are missing from ChatGPT, Perplexity, Gemini, Claude',
        metric: 'ChatGPT',
        status: 'completed',
        workspaceId: workspace._id,
      },
    ];

    await Task.insertMany(tasks);
    console.log('✅ Seeded Tasks');

    console.log('Seed complete! You can copy the Workspace ID above into your frontend environment or hardcode it for testing.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
