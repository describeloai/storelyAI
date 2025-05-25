// Handler de intención para Tariq, especialista en contenido, anuncios y campañas
export function detectTariqIntent(prompt: string) {
  const lower = prompt.toLowerCase();

  // Publicaciones para redes sociales
  if (
    lower.includes('redes sociales') ||
    lower.includes('post para instagram') ||
    lower.includes('publicación') ||
    lower.includes('social media') ||
    lower.includes('contenido para redes') ||
    lower.includes('post para tiktok')
  ) {
    return {
      tool: 'social-post-generator',
      model: 'gpt-4',
    };
  }

  // Email marketing o flujos de email (compartido con Echo)
  if (
    lower.includes('email') ||
    lower.includes('correo') ||
    lower.includes('flujo') ||
    lower.includes('campaña de email') ||
    lower.includes('mailing') ||
    lower.includes('email marketing')
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
    lower.includes('copy publicitario')
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
    lower.includes('long form') ||
    lower.includes('contenido seo')
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
    lower.includes('reel')
  ) {
    return {
      tool: 'video-ad-script-generator',
      model: 'gpt-4',
    };
  }

  // Fallback: generador de contenido general para ecommerce
  return {
    tool: 'content-creator',
    model: 'gpt-4',
  };
}
