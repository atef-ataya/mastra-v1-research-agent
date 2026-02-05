import { Mastra } from '@mastra/core/mastra';
import { researchAgent } from './agents/research';

export const mastra = new Mastra({
  agents: { researchAgent },
});

export const mastra = new Mastra({
  agents: { researchAgent },
  storage,
  server: {
    port: 4111,
    timeout: 30000,
  },
});
