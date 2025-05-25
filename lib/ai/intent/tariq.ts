import type { AiIntent } from '@/lib/ai/types';

// Handler de intención para Tariq, especialista en contenido, anuncios y campañas
export function detectTariqIntent(prompt: string, fromUser: boolean): AiIntent {
  // Si el mensaje no proviene del usuario, usar el modelo por defecto más económico
  if (!fromUser) {
    return {
      tool: 'content-creator',
      model: 'gpt-3.5-turbo',
    };
  }

  const lower = prompt.toLowerCase();

  // Publicaciones para redes sociales
  if (
    lower.includes('redes sociales') ||
    lower.includes('post para instagram') ||
    lower.includes('publicación') ||
    lower.includes('contenido para redes') ||
    lower.includes('post para tiktok') ||
    lower.includes('social media') ||
    lower.includes('instagram post') ||
    lower.includes('social post') ||
    lower.includes('tiktok post')
  ) {
    return {
      tool: 'social-post-generator',
      model: 'gpt-4',
    };
  }

  // Email marketing o flujos de email
  if (
    lower.includes('email') ||
    lower.includes('correo') ||
    lower.includes('flujo') ||
    lower.includes('campaña de email') ||
    lower.includes('mailing') ||
    lower.includes('email marketing') ||
    lower.includes('email flow') ||
    lower.includes('email campaign') ||
    lower.includes('mail sequence')
  ) {
    return {
      tool: 'email-campaign-assistant',
      model: 'gpt-4',
    };
  }

  // Anuncios (ads), banners, campañas de promoción
  if (
    lower.includes('anuncio') ||
    lower.includes('ads') ||
    lower.includes('facebook ads') ||
    lower.includes('banner') ||
    lower.includes('promoción') ||
    lower.includes('copy publicitario') ||
    lower.includes('ad') ||
    lower.includes('promotion') ||
    lower.includes('ad copy')
  ) {
    return {
      tool: 'ad-copy-generator',
      model: 'gpt-4',
    };
  }

  // Contenido para blogs o artículos optimizados para SEO
  if (
    lower.includes('blog') ||
    lower.includes('seo') ||
    lower.includes('artículo') ||
    lower.includes('post largo') ||
    lower.includes('contenido seo') ||
    lower.includes('long form') ||
    lower.includes('article') ||
    lower.includes('blog post') ||
    lower.includes('seo content')
  ) {
    return {
      tool: 'blog-seo-writer',
      model: 'gpt-4',
    };
  }

  // Guiones para anuncios en video
  if (
    lower.includes('guion de video') ||
    lower.includes('video ad') ||
    lower.includes('script de anuncio') ||
    lower.includes('guion') ||
    lower.includes('video promocional') ||
    lower.includes('video para tiktok') ||
    lower.includes('reel') ||
    lower.includes('video script') ||
    lower.includes('tiktok video') ||
    lower.includes('ad script')
  ) {
    return {
      tool: 'video-ad-script-generator',
      model: 'gpt-4',
    };
  }

  // Fallback
  return {
    tool: 'content-creator',
    model: 'gpt-3.5-turbo',
  };
}
