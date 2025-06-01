import { askCoreAI } from '@/lib/ai/clients/askCore';
import type { AiIntent, ChatMessage } from '@/lib/ai/types';

export async function askBaseAI({
  prompt,
  intent,
  systemPrompt,
  history = [],
}: {
  prompt: string;
  intent: AiIntent;
  systemPrompt: string;
  history: ChatMessage[];
}) {
  const isGpt4 = intent.model === 'gpt-4';
  const model = isGpt4 ? 'gpt-4' : 'gpt-3.5-turbo';

  const trimmedHistory = history.slice(-1); // ✅ solo último mensaje para ahorrar tokens

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt }, // ✅ siempre incluir el systemPrompt
    ...trimmedHistory,
    { role: 'user', content: prompt },
  ];

  return await askCoreAI({
    messages,
    model,
  });
}