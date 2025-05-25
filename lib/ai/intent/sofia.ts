// Handler de intención mejorado para Sofía
export function detectSofiaIntent(prompt: string) {
  const lower = prompt.toLowerCase();

  // Traductor de productos / catálogo
  if (
    lower.includes('traducir') ||
    lower.includes('translate') ||
    lower.includes('idioma') ||
    lower.includes('multilingüe') ||
    lower.includes('multilingual')
  ) {
    return {
      tool: 'catalog-translator',
      model: 'claude', // O gpt-4 si prefieres mantenerlo unificado
    };
  }

  // Cargar productos desde CSV o proveedor
  if (
    lower.includes('subir productos') ||
    lower.includes('csv') ||
    lower.includes('cargar productos') ||
    lower.includes('proveedor') ||
    lower.includes('importar')
  ) {
    return {
      tool: 'product-loader',
      model: 'gpt-4',
    };
  }

  // Descripciones de producto
  if (
    lower.includes('descripción de producto') ||
    lower.includes('descripcion') ||
    lower.includes('description') ||
    lower.includes('ficha de producto')
  ) {
    return {
      tool: 'product-description-generator',
      model: 'gpt-4',
    };
  }

  // Optimizar título o SEO
  if (
    lower.includes('título') ||
    lower.includes('title') ||
    lower.includes('seo') ||
    lower.includes('optimizar seo') ||
    lower.includes('meta') ||
    lower.includes('on-page')
  ) {
    return {
      tool: 'seo-title-optimizer',
      model: 'gpt-4',
    };
  }

  // FAQs Generator
  if (
    lower.includes('preguntas frecuentes') ||
    lower.includes('faq') ||
    lower.includes('frequent questions') ||
    lower.includes('generar faq')
  ) {
    return {
      tool: 'faq-generator',
      model: 'gpt-4',
    };
  }

  // Optimización de página de producto
  if (
    lower.includes('optimizar página de producto') ||
    lower.includes('mejorar ficha') ||
    lower.includes('mejorar página') ||
    lower.includes('product page optimizer')
  ) {
    return {
      tool: 'product-page-optimizer',
      model: 'gpt-4',
    };
  }

  // Guía de tallas / Size Helper
  if (
    lower.includes('talla') ||
    lower.includes('guía de tallas') ||
    lower.includes('size') ||
    lower.includes('size guide') ||
    lower.includes('medidas')
  ) {
    return {
      tool: 'size-helper',
      model: 'gpt-4',
    };
  }

  // Resumen de reviews de producto
  if (
    lower.includes('resumen de reseñas') ||
    lower.includes('resumen de reviews') ||
    lower.includes('análisis de opiniones') ||
    lower.includes('summary of reviews') ||
    lower.includes('reviews analysis')
  ) {
    return {
      tool: 'review-summary',
      model: 'gpt-4',
    };
  }

  // Editor de imágenes por IA
  if (
    lower.includes('imagen') ||
    lower.includes('foto') ||
    lower.includes('mejorar imagen') ||
    lower.includes('generar imagen') ||
    lower.includes('image editor') ||
    lower.includes('photo editor')
  ) {
    return {
      tool: 'image-editor-ai',
      model: 'gpt-4',
    };
  }

  // Fallback: descripción general de producto
  return {
    tool: 'product-description-generator',
    model: 'gpt-4',
  };
}
