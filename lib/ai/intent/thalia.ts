import type { AiIntent } from '../types';

// Handler de intención para Thalia, especialista en diseño de fichas, landings y visual
export function detectThaliaIntent(prompt: string): AiIntent {
  const lower = prompt.toLowerCase();

  // Generación o mejora de fichas de producto
  if (
    lower.includes('ficha de producto') ||
    lower.includes('generar ficha') ||
    lower.includes('ficha lista') ||
    lower.includes('publicar producto') ||
    lower.includes('product sheet') ||
    lower.includes('product card') ||
    lower.includes('product page') ||
    lower.includes('generate sheet')
  ) {
    return {
      tool: 'product-sheet-generator',
      model: 'gpt-4',
    };
  }

  // Creación de landing pages desde URLs o conceptos
  if (
    lower.includes('landing') ||
    lower.includes('página de aterrizaje') ||
    lower.includes('crear página') ||
    lower.includes('landing page') ||
    lower.includes('generar landing') ||
    lower.includes('lp desde url') ||
    lower.includes('landing from url') ||
    lower.includes('create landing') ||
    lower.includes('generate landing')
  ) {
    return {
      tool: 'landing-page-builder',
      model: 'gpt-4',
    };
  }

  // Optimización visual (mockups, banners, etc.)
  if (
    lower.includes('mockup') ||
    lower.includes('banner') ||
    lower.includes('mejorar diseño') ||
    lower.includes('optimizar imagen') ||
    lower.includes('mejorar visual') ||
    lower.includes('diseño visual') ||
    lower.includes('visual upgrade') ||
    lower.includes('improve visuals') ||
    lower.includes('optimize image')
  ) {
    return {
      tool: 'visual-optimizer',
      model: 'gpt-4',
    };
  }

  // Edición de imágenes con IA
  if (
    lower.includes('editor de imágenes') ||
    lower.includes('editar imagen') ||
    lower.includes('generar imagen') ||
    lower.includes('photo enhancer') ||
    lower.includes('image editor') ||
    lower.includes('edit image') ||
    lower.includes('generate image') ||
    lower.includes('ai image')
  ) {
    return {
      tool: 'ai-image-editor',
      model: 'gpt-4',
    };
  }

  // Fallback: sugerencias de diseño web general
  return {
    tool: 'web-design-advisor',
    model: 'gpt-4',
  };
}
