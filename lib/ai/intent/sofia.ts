import type { AiIntent } from '../types';

export function detectSofiaIntent(prompt: string): AiIntent {
  const lower = prompt.toLowerCase();

  if (lower.includes('auditoría') || lower.includes('seo') || lower.includes('reseñas largas')) {
    return {
      tool: 'auditor',
      model: 'gpt-4',
    };
  }

  // Por defecto: GPT-3.5
  return {
    tool: 'text-generator',
    model: 'gpt-3.5-turbo',
  };
}
