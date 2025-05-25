import type { AiIntent } from '../types';

export function detectCiroIntent(prompt: string): AiIntent {
  const lower = prompt.toLowerCase();

  // Tareas complejas → GPT-4
  if (
    lower.includes('predicción') ||
    lower.includes('competencia') ||
    lower.includes('comparador') ||
    lower.includes('storelytrack') ||
    lower.includes('análisis de campañas') ||
    lower.includes('atribu') || // atribución
    lower.includes('márgenes') ||
    lower.includes('rentabilidad')
  ) {
    return {
      tool: 'analytics',
      model: 'gpt-4',
    };
  }

  // Tareas simples → GPT-3.5
  return {
    tool: 'data-helper',
    model: 'gpt-3.5-turbo',
  };
}
