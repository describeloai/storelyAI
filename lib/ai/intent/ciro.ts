import type { AiIntent } from '@/lib/ai/types';

// Handler de intención para Ciro, especialista en datos, análisis y predicciones
export function detectCiroIntent(prompt: string): AiIntent {
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
    lower.includes('atribución') || // atribución / attribution
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

  // Por defecto: análisis o ayuda de datos básica → GPT-3.5
  return {
    tool: 'data-helper',
    model: 'gpt-3.5-turbo',
  };
}
