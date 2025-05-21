// utils/navigateToEmbeddedRoute.ts
export function navigateToEmbeddedRoute(path: string) {
  const params = new URLSearchParams(window.location.search);
  const host = params.get('host');
  const shop = params.get('shop');

  if (!host || !shop) {
    console.warn('Faltan parámetros embebidos. Redirigiendo normal.');
    window.location.href = path;
    return;
  }

  const url = `${path}?host=${host}&shop=${shop}&embedded=1`;
  window.location.href = url;
}
