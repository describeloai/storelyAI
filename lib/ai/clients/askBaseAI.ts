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

  // 🧠 Usamos solo el último mensaje previo como contexto conversacional
  const trimmedHistory = history.slice(-1);

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: systemPrompt, // ✅ Instrucciones base + contexto del Brain
    },
    ...trimmedHistory,
    {
      role: 'user',
      content: prompt, // ✅ Pregunta actual del usuario
    },
  ];

  return await askCoreAI({
    messages,
    model,
    max_tokens: 400, // 🔒 Limita la longitud de la respuesta para mayor eficiencia
  });
}
