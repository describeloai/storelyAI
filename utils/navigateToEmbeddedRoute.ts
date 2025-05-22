export function navigateToEmbeddedRoute(path: string) {
  const currentParams = new URLSearchParams(window.location.search);
  const host = currentParams.get('host');
  const shop = currentParams.get('shop');

  if (!host || !shop) {
    console.warn('⚠️ Faltan parámetros "host" o "shop". Redirigiendo a /redirect-entry para recuperarlos.');
    const redirectTo = encodeURIComponent(path);
    window.location.href = `/redirect-entry?redirectTo=${redirectTo}`;
    return;
  }

  const targetUrl = new URL(path, window.location.origin);
  const newParams = new URLSearchParams(targetUrl.search);

  if (!newParams.has('host')) newParams.set('host', host);
  if (!newParams.has('shop')) newParams.set('shop', shop);
  if (!newParams.has('embedded')) newParams.set('embedded', '1');

  targetUrl.search = newParams.toString();

  console.log('🔁 Navegando a ruta embebida:', targetUrl.toString());
  window.location.href = targetUrl.toString();
}
