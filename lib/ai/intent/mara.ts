// Handler de intención para Mara, especialista en growth, conversión y estrategia
export function detectMaraIntent(prompt: string) {
  const lower = prompt.toLowerCase();

  // Auditoría de tienda o revisión general
  if (
    lower.includes('auditoría') ||
    lower.includes('auditar') ||
    lower.includes('auditor') ||
    lower.includes('revisión de tienda') ||
    lower.includes('mejorar mi tienda') ||
    lower.includes('análisis de tienda') ||
    lower.includes('store audit')
  ) {
    return {
      tool: 'store-auditor',
      model: 'gpt-4',
    };
  }

  // Consultoría de conversión o mejora del embudo
  if (
    lower.includes('conversión') ||
    lower.includes('conversion rate') ||
    lower.includes('mejorar conversiones') ||
    lower.includes('funnel') ||
    lower.includes('embudo') ||
    lower.includes('consultor de conversión')
  ) {
    return {
      tool: 'conversion-consultant',
      model: 'gpt-4',
    };
  }

  // Recomendaciones estratégicas o decisiones de negocio
  if (
    lower.includes('estrategia') ||
    lower.includes('recomiéndame') ||
    lower.includes('sugerencia') ||
    lower.includes('business coach') ||
    lower.includes('decisiones') ||
    lower.includes('mejorar ventas') ||
    lower.includes('crecer negocio') ||
    lower.includes('growth')
  ) {
    return {
      tool: 'business-strategy-coach',
      model: 'gpt-4',
    };
  }

  // Tendencias virales o búsqueda de productos ganadores
  if (
    lower.includes('producto viral') ||
    lower.includes('tendencia') ||
    lower.includes('tendencias virales') ||
    lower.includes('productos ganadores') ||
    lower.includes('viral') ||
    lower.includes('trend')
  ) {
    return {
      tool: 'viral-product-finder',
      model: 'gpt-4',
    };
  }

  // Fallback: análisis general de negocio y crecimiento
  return {
    tool: 'growth-analysis',
    model: 'gpt-4',
  };
}
