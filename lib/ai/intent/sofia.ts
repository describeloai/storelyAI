import type { AiIntent } from '@/lib/ai/types';

export function detectSofiaIntent(prompt: string, fromUser: boolean): AiIntent {
  // ✅ Si no es del usuario, usar fallback seguro con GPT-3.5
  if (!fromUser) {
    return {
      tool: 'text-generator',
      model: 'gpt-3.5-turbo',
    };
  }

  const lower = prompt.toLowerCase();

  // Auditoría o análisis avanzado de ficha
  if (
    lower.includes('auditoría') ||
    lower.includes('audit') ||
    lower.includes('análisis seo') ||
    lower.includes('seo audit') ||
    lower.includes('reseñas largas') ||
    lower.includes('long reviews') ||
    lower.includes('review summary') ||
    lower.includes('resumen de reseñas')
  ) {
    return {
      tool: 'product-page-optimizer',
      model: 'gpt-4',
    };
  }

  // Carga desde CSV, proveedor o tabla
  if (
    lower.includes('cargar csv') ||
    lower.includes('importar productos') ||
    lower.includes('subir catálogo') ||
    lower.includes('proveedor') ||
    lower.includes('excel') ||
    lower.includes('csv upload') ||
    lower.includes('spreadsheet') ||
    lower.includes('product importer')
  ) {
    return {
      tool: 'smart-product-uploader',
      model: 'gpt-3.5-turbo',
    };
  }

  // Generación u optimización de descripciones
  if (
    lower.includes('descripción') ||
    lower.includes('descripcion de producto') ||
    lower.includes('generar descripción') ||
    lower.includes('description') ||
    lower.includes('product description')
  ) {
    return {
      tool: 'description-generator',
      model: 'gpt-3.5-turbo',
    };
  }

  // Optimización de títulos o SEO on-page
  if (
    lower.includes('título') ||
    lower.includes('optimizar título') ||
    lower.includes('title optimizer') ||
    lower.includes('seo') ||
    lower.includes('meta título') ||
    lower.includes('seo title')
  ) {
    return {
      tool: 'seo-title-optimizer',
      model: 'gpt-4',
    };
  }

  // Traducción de catálogo o productos
  if (
    lower.includes('traducir') ||
    lower.includes('traducción') ||
    lower.includes('translator') ||
    lower.includes('translate product') ||
    lower.includes('multi language') ||
    lower.includes('translate catalog')
  ) {
    return {
      tool: 'catalog-translator',
      model: 'gpt-3.5-turbo',
    };
  }

  // FAQs generator
  if (
    lower.includes('preguntas frecuentes') ||
    lower.includes('faqs') ||
    lower.includes('frequent questions') ||
    lower.includes('faq generator') ||
    lower.includes('generar preguntas')
  ) {
    return {
      tool: 'faqs-generator',
      model: 'gpt-3.5-turbo',
    };
  }

  // Generador de guía de tallas
  if (
    lower.includes('guía de tallas') ||
    lower.includes('size guide') ||
    lower.includes('size helper') ||
    lower.includes('tallas') ||
    lower.includes('size chart')
  ) {
    return {
      tool: 'size-helper',
      model: 'gpt-3.5-turbo',
    };
  }

  // Editor de imágenes con IA
  if (
    lower.includes('editor de imágenes') ||
    lower.includes('image editor') ||
    lower.includes('editar imagen') ||
    lower.includes('generar imagen') ||
    lower.includes('ai image')
  ) {
    return {
      tool: 'ai-image-editor',
      model: 'gpt-4',
    };
  }

  // Fallback
  return {
    tool: 'text-generator',
    model: 'gpt-3.5-turbo',
  };
}
