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

  const trimmedHistory = history.slice(-1);

  // ✅ Separamos el systemPrompt por claridad y tipado fuerte
  const initialMessages: ChatMessage[] =
    trimmedHistory.length === 0
      ? [{ role: 'system', content: systemPrompt }]
      : [];

  const messages: ChatMessage[] = [
    ...initialMessages,
    ...trimmedHistory,
    { role: 'user', content: prompt },
  ];

  return await askCoreAI({
    messages,
    model,
  });
}
