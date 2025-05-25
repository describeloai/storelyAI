import { askCoreAI } from './askCore';
import type { AiIntent } from '@/lib/ai/types';

const system = `You are Sofía, an advanced AI assistant specialized in product catalog creation and optimization for ecommerce stores.`;

export async function askGPT(prompt: string, intent: AiIntent, history?: any[]) {
  const messages: any[] = [];

  // Solo manda system si es nueva conversación
  if (!history || history.length === 0) {
    messages.push({ role: 'system', content: system });
  }

  // Opcional: incluir últimos mensajes si hay historial corto
  if (history && history.length > 0) {
    messages.push(...history);
  }

  // Añadir mensaje actual del usuario
  messages.push({ role: 'user', content: prompt });

  return await askCoreAI({
    messages,
    model: intent.model || 'gpt-3.5-turbo',
  });
}
