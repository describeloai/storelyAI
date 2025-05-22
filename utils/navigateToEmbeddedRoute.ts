export function navigateToEmbeddedRoute(path: string) {
  const currentParams = new URLSearchParams(window.location.search);
  const host = currentParams.get('host');
  const shop = currentParams.get('shop');

  if (!host || !shop) {
    console.warn('Faltan parámetros embebidos. Redirigiendo normal.');
    window.location.href = path;
    return;
  }

  const targetUrl = new URL(path, window.location.origin);
  const newParams = new URLSearchParams(targetUrl.search);

  // Agrega los parámetros embebidos si no están
  if (!newParams.has('host')) newParams.set('host', host);
  if (!newParams.has('shop')) newParams.set('shop', shop);
  if (!newParams.has('embedded')) newParams.set('embedded', '1');

  targetUrl.search = newParams.toString();

  window.location.href = targetUrl.toString();
}
