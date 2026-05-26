/**
 * seedRecipes.ts
 * Run once to populate the Recipes collection:
 *   npx ts-node scripts/seedRecipes.ts
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import { Recipe } from '../models/Recipe';

const RECIPES = [
  {
    title: 'Competitor SEO Audit',
    description: 'Automatically scrape competitor landing pages and use AI to extract SEO gaps, missing keywords, and meta tag weaknesses.',
    icon: 'search',
    flowData: {
      nodes: [
        { id: 'trigger-1', type: 'trigger', position: { x: 100, y: 100 }, data: { label: 'Schedule Trigger', cron: '0 9 * * 1' } },
        { id: 'scraper-1', type: 'scraper', position: { x: 350, y: 100 }, data: { label: 'Web Scraper', url: '' } },
        { id: 'openai-1', type: 'openai', position: { x: 600, y: 100 }, data: { label: 'SEO Analyser', prompt: 'Analyse the scraped website content and identify the top 5 SEO weaknesses. Return JSON with keys: weaknesses (array), missingKeywords (array), suggestions (array).' } },
      ],
      edges: [
        { id: 'e1-2', source: 'trigger-1', target: 'scraper-1' },
        { id: 'e2-3', source: 'scraper-1', target: 'openai-1' },
      ],
    },
  },
  {
    title: 'Cold Email Prospector',
    description: 'Extract decision-maker names and roles from target company "About Us" pages and enrich them for cold outreach.',
    icon: 'mail',
    flowData: {
      nodes: [
        { id: 'trigger-1', type: 'trigger', position: { x: 100, y: 100 }, data: { label: 'Manual Trigger' } },
        { id: 'scraper-1', type: 'scraper', position: { x: 350, y: 100 }, data: { label: 'Web Scraper', url: '' } },
        { id: 'openai-1', type: 'openai', position: { x: 600, y: 100 }, data: { label: 'Contact Extractor', prompt: 'Extract all decision-makers (C-suite, VP, Director level) from the text. Return JSON with keys: contacts (array of {name, title, email?}).' } },
      ],
      edges: [
        { id: 'e1-2', source: 'trigger-1', target: 'scraper-1' },
        { id: 'e2-3', source: 'scraper-1', target: 'openai-1' },
      ],
    },
  },
  {
    title: 'Market Intelligence Report',
    description: 'Monitor industry news and blogs, then summarise weekly market trends into a digestible AI-generated report.',
    icon: 'chart',
    flowData: {
      nodes: [
        { id: 'trigger-1', type: 'trigger', position: { x: 100, y: 100 }, data: { label: 'Weekly Schedule', cron: '0 8 * * 5' } },
        { id: 'scraper-1', type: 'scraper', position: { x: 350, y: 100 }, data: { label: 'News Scraper', url: '' } },
        { id: 'openai-1', type: 'openai', position: { x: 600, y: 100 }, data: { label: 'Report Generator', prompt: 'Summarise the following industry news into a weekly report with sections: Key Trends, Notable Companies, Opportunities. Return valid JSON.' } },
      ],
      edges: [
        { id: 'e1-2', source: 'trigger-1', target: 'scraper-1' },
        { id: 'e2-3', source: 'scraper-1', target: 'openai-1' },
      ],
    },
  },
  {
    title: 'Lead Scoring Automation',
    description: 'Analyse inbound lead pages and use AI to score them by ICP fit, company size, and intent signals.',
    icon: 'target',
    flowData: {
      nodes: [
        { id: 'trigger-1', type: 'trigger', position: { x: 100, y: 100 }, data: { label: 'New Lead Trigger' } },
        { id: 'scraper-1', type: 'scraper', position: { x: 350, y: 100 }, data: { label: 'Company Scraper', url: '' } },
        { id: 'openai-1', type: 'openai', position: { x: 600, y: 100 }, data: { label: 'ICP Scorer', prompt: 'Score this company against our ICP (B2B SaaS, 50-500 employees, Series A+). Return JSON with: score (0-100), reasoning, fitLevel ("high"|"medium"|"low").' } },
      ],
      edges: [
        { id: 'e1-2', source: 'trigger-1', target: 'scraper-1' },
        { id: 'e2-3', source: 'scraper-1', target: 'openai-1' },
      ],
    },
  },
  {
    title: 'Tech Stack Detector',
    description: 'Scrape target company websites to detect their current tech stack and identify upgrade or displacement opportunities.',
    icon: 'globe',
    flowData: {
      nodes: [
        { id: 'trigger-1', type: 'trigger', position: { x: 100, y: 100 }, data: { label: 'Manual Trigger' } },
        { id: 'scraper-1', type: 'scraper', position: { x: 350, y: 100 }, data: { label: 'Tech Scraper', url: '' } },
        { id: 'openai-1', type: 'openai', position: { x: 600, y: 100 }, data: { label: 'Stack Analyser', prompt: 'Identify all technologies, frameworks, analytics tools, and SaaS products mentioned or detectable on this page. Return JSON with: technologies (array of {name, category, confidence}).' } },
      ],
      edges: [
        { id: 'e1-2', source: 'trigger-1', target: 'scraper-1' },
        { id: 'e2-3', source: 'scraper-1', target: 'openai-1' },
      ],
    },
  },
  {
    title: 'Instant Workflow Trigger',
    description: 'A minimal single-step trigger template to kickstart any custom automation. Add your own nodes on the canvas.',
    icon: 'zap',
    flowData: {
      nodes: [
        { id: 'trigger-1', type: 'trigger', position: { x: 100, y: 150 }, data: { label: 'Manual Trigger' } },
      ],
      edges: [],
    },
  },
];

async function seed() {
  const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/stackhound';
  await mongoose.connect(MONGO_URI);
  console.log(`📦 Connected to MongoDB at ${MONGO_URI}`);

  // Clear existing recipes
  await Recipe.deleteMany({});
  console.log('🗑  Cleared existing recipes');

  // Insert new recipes
  const inserted = await Recipe.insertMany(RECIPES);
  console.log(`✅ Seeded ${inserted.length} recipes`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
