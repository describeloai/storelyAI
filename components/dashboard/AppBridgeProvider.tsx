'use client';

import { useEffect } from 'react';
import createApp from '@shopify/app-bridge';
import { getSessionToken } from '@shopify/app-bridge-utils';

export default function AppBridgeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    let host = query.get('host');

    // Guardar en sessionStorage si viene en la URL
    if (host) {
      sessionStorage.setItem('shopify-host', host);
    } else {
      host = sessionStorage.getItem('shopify-host') || '';
    }

    console.log('🧩 HOST en AppBridgeProvider:', host);

    if (host) {
      const app = createApp({
        apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
        host,
        forceRedirect: true,
      });

      (window as any).shopifyApp = app;
      console.log('✅ App Bridge creado y asignado a window.shopifyApp');

      getSessionToken(app).then(token => {
        console.log('🔑 Token de sesión:', token);
      });
    } else {
      console.warn('⚠️ No se detectó "host", redirigiendo al flujo de entrada para recuperar el parámetro...');
      const currentUrl = window.location.href;
      window.location.href = `/api/redirect-entry?redirectTo=${encodeURIComponent(currentUrl)}`;
    }
  }, []);

  return <>{children}</>;
}
