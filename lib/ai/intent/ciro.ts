// Handler de intención para Ciro, experto en pricing y análisis estratégico
export function detectCiroIntent(prompt: string) {
  const lower = prompt.toLowerCase();

  // Asesor de precios o comparador de competencia
  if (
    lower.includes('precio') ||
    lower.includes('precios dinámicos') ||
    lower.includes('price') ||
    lower.includes('competencia') ||
    lower.includes('competitor') ||
    lower.includes('comparar precios')
  ) {
    return {
      tool: 'dynamic-pricing-advisor',
      model: 'gpt-4',
    };
  }

  // Análisis de márgenes o costos
  if (
    lower.includes('margen') ||
    lower.includes('beneficio') ||
    lower.includes('rentabilidad') ||
    lower.includes('ganancia') ||
    lower.includes('coste') ||
    lower.includes('cost') ||
    lower.includes('profit') ||
    lower.includes('loss')
  ) {
    return {
      tool: 'margin-cost-analyzer',
      model: 'gpt-4',
    };
  }

  // Predicción de ventas o inventario
  if (
    lower.includes('predecir') ||
    lower.includes('predicción') ||
    lower.includes('forecast') ||
    lower.includes('ventas futuras') ||
    lower.includes('demanda') ||
    lower.includes('inventario futuro')
  ) {
    return {
      tool: 'sales-inventory-predictor',
      model: 'gpt-4',
    };
  }

  // Alertas de inventario bajo o sugerencias de reposición
  if (
    lower.includes('reabastecimiento') ||
    lower.includes('reponer') ||
    lower.includes('stock bajo') ||
    lower.includes('sin inventario') ||
    lower.includes('stock alert') ||
    lower.includes('inventory alert')
  ) {
    return {
      tool: 'restock-alert-system',
      model: 'gpt-4',
    };
  }

  // Análisis de campañas, tráfico y conversiones (StorelyTrack)
  if (
    lower.includes('campaña') ||
    lower.includes('ads') ||
    lower.includes('tráfico') ||
    lower.includes('storelytrack') ||
    lower.includes('conversiones') ||
    lower.includes('ventas') ||
    lower.includes('análisis de campañas') ||
    lower.includes('analytics')
  ) {
    return {
      tool: 'storelytrack-analyzer',
      model: 'gpt-4',
    };
  }

  // Fallback: análisis general estratégico
  return {
    tool: 'ecommerce-strategy-analyzer',
    model: 'gpt-4',
  };
}
