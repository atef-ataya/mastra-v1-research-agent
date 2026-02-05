import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { searchTool, saveTool } from '../tools';

export const researchAgent = new Agent({
  name: 'researchAgent', // Must match mastra.getAgent("researchAgent")
  instructions: `You are a research assistant. Use search to find info and save to store it.`,
  model: 'openai/gpt-4o',
  tools: { search: searchTool, save: saveTool },
  memory: new Memory(),
});
