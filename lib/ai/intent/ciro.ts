import type { AiIntent } from '@/lib/ai/types';

// Handler de intención para Ciro, especialista en datos, análisis y predicciones
export function detectCiroIntent(prompt: string, fromUser: boolean): AiIntent {
  // ✅ Si el mensaje no es del usuario, evitar activar GPT-4
  if (!fromUser) {
    return {
      tool: 'data-helper',
      model: 'gpt-3.5-turbo',
    };
  }

  const lower = prompt.toLowerCase();

  // Análisis complejo, predicciones, atribución, campañas → GPT-4
  if (
    lower.includes('predicción') ||
    lower.includes('prediction') ||
    lower.includes('competencia') ||
    lower.includes('competitor') ||
    lower.includes('comparador') ||
    lower.includes('compare') ||
    lower.includes('track') ||
    lower.includes('análisis de campañas') ||
    lower.includes('campaign analysis') ||
    lower.includes('atribución') ||
    lower.includes('attribution') ||
    lower.includes('márgenes') ||
    lower.includes('margins') ||
    lower.includes('rentabilidad') ||
    lower.includes('profitability') ||
    lower.includes('roi') ||
    lower.includes('return on investment')
  ) {
    return {
      tool: 'analytics',
      model: 'gpt-4',
    };
  }

  // Fallback: ayuda básica de datos → GPT-3.5
  return {
    tool: 'data-helper',
    model: 'gpt-3.5-turbo',
  };
}
