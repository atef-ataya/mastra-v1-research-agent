import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const searchTool = createTool({
  id: 'search',
  description: 'Search the web for information on a topic.',
  inputSchema: z.object({
    query: z.string().describe('The search query to execute'),
    maxResults: z.number().default(5),
  }),
  execute: async ({ input }) => {
    // Corrected v1 signature
    const { query, maxResults } = input;

    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`,
    );
    const data = await response.json();

    const results =
      data.RelatedTopics?.slice(0, maxResults).map((topic: any) => ({
        title: topic.Text?.split(' - ')[0] || 'Untitled',
        snippet: topic.Text || '',
        url: topic.FirstURL || '',
      })) || [];

    return { results, searchedAt: new Date().toISOString() };
  },
});
