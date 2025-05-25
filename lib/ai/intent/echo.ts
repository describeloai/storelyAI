import type { AiIntent } from '../types';

// Handler de intención para Echo, especialista en atención al cliente y respuestas automáticas
export function detectEchoIntent(prompt: string): AiIntent {
  const lower = prompt.toLowerCase();

  // Reseñas, opiniones, FAQs, Q&A
  if (
    lower.includes('reseña') ||
    lower.includes('review') ||
    lower.includes('opinión') ||
    lower.includes('q&a') ||
    lower.includes('faq') ||
    lower.includes('pregunta frecuente') ||
    lower.includes('customer question') ||
    lower.includes('common question')
  ) {
    return {
      tool: 'reviews-qna-handler',
      model: 'gpt-4',
    };
  }

  // Chat automático, atención al cliente, soporte
  if (
    lower.includes('chat') ||
    lower.includes('mensaje') ||
    lower.includes('respuesta automática') ||
    lower.includes('soporte') ||
    lower.includes('atención al cliente') ||
    lower.includes('respuesta instantánea') ||
    lower.includes('auto reply') ||
    lower.includes('support') ||
    lower.includes('customer service')
  ) {
    return {
      tool: 'auto-reply-chat',
      model: 'gpt-4',
    };
  }

  // Correos automáticos, seguimiento, postventa
  if (
    lower.includes('email') ||
    lower.includes('correo') ||
    lower.includes('seguimiento') ||
    lower.includes('postventa') ||
    lower.includes('upselling') ||
    lower.includes('abandono de carrito') ||
    lower.includes('email booster') ||
    lower.includes('follow-up') ||
    lower.includes('email sequence')
  ) {
    return {
      tool: 'email-booster',
      model: 'gpt-4',
    };
  }

  // Traducción o idiomas (multilingual chatbot)
  if (
    lower.includes('traducir') ||
    lower.includes('translate') ||
    lower.includes('idioma') ||
    lower.includes('multilingüe') ||
    lower.includes('multilingual') ||
    lower.includes('translate chat') ||
    lower.includes('bilingual bot')
  ) {
    return {
      tool: 'multilingual-chatbot',
      model: 'gpt-4',
    };
  }

  // Fallback: chat automático general
  return {
    tool: 'auto-response-general',
    model: 'gpt-4',
  };
}
