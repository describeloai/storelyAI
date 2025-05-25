// Puedes mejorar este handler para usar lógica de intención real
export function detectEchoIntent(prompt: string) {
  const lower = prompt.toLowerCase();

  // Si el prompt habla de reseñas, opiniones o preguntas frecuentes
  if (
    lower.includes('reseña') ||
    lower.includes('review') ||
    lower.includes('opinión') ||
    lower.includes('q&a') ||
    lower.includes('pregunta frecuente') ||
    lower.includes('faq')
  ) {
    return {
      tool: 'reviews-qna-handler',
      model: 'gpt-4',
    };
  }

  // Si el prompt menciona chats, atención al cliente o respuestas automáticas
  if (
    lower.includes('chat') ||
    lower.includes('mensaje') ||
    lower.includes('respuesta automática') ||
    lower.includes('soporte') ||
    lower.includes('atención al cliente') ||
    lower.includes('pregunta común')
  ) {
    return {
      tool: 'auto-reply-chat',
      model: 'gpt-4',
    };
  }

  // Si se refiere a correos automáticos o emails de ecommerce
  if (
    lower.includes('email') ||
    lower.includes('correo') ||
    lower.includes('postventa') ||
    lower.includes('upselling') ||
    lower.includes('abandono de carrito') ||
    lower.includes('email booster') ||
    lower.includes('seguimiento')
  ) {
    return {
      tool: 'email-booster',
      model: 'gpt-4',
    };
  }

  // Si pide traducción o mención de idiomas
  if (
    lower.includes('traducir') ||
    lower.includes('translate') ||
    lower.includes('idioma') ||
    lower.includes('multilingüe') ||
    lower.includes('multilingual')
  ) {
    return {
      tool: 'multilingual-chatbot',
      model: 'claude', // o gpt-4 si prefieres mantener uno solo
    };
  }

  // Por defecto, usa GPT-4 con herramienta general de conversación automatizada
  return {
    tool: 'auto-response-general',
    model: 'gpt-4',
  };
}
