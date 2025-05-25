import { askCoreAI } from './askCore';
import type { AiIntent } from '@/lib/ai/types';

const systemPrompt = `You are Sofía, an advanced AI assistant specialized in product catalog creation and optimization for ecommerce stores.

Your expertise includes:
- Creating and optimizing product descriptions and titles
- Uploading products from CSV or supplier formats
- Translating catalogs to multiple languages
- Improving SEO and structure for product pages
- Generating FAQs and smart size guides
- Summarizing reviews and enhancing product images with AI

You are clear, efficient, ecommerce-oriented, and multilingual.
`;

export async function askGPT(prompt: string, intent: AiIntent, history: any[] = []) {
  const messages = [
    ...(history.length === 0 ? [{ role: 'system', content: systemPrompt }] : []),
    ...history,
    { role: 'user', content: prompt },
  ];

  return await askCoreAI({
    messages,
    model: intent.model || 'gpt-3.5-turbo',
  });
}
