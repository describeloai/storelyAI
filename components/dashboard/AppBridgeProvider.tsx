'use client';

import { useEffect } from 'react';
import createApp from '@shopify/app-bridge';
import { getSessionToken } from '@shopify/app-bridge-utils';

export default function AppBridgeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const host = query.get('host');

    console.log('🔎 HOST en AppBridgeProvider:', host);

    if (host) {
      const app = createApp({
        apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
        host,
        forceRedirect: true,
      });

      // ✅ Exponer app globalmente
      (window as any).shopifyApp = app;
      console.log('✅ App Bridge creado y asignado a window.shopifyApp');

      // Puedes probar el token también
      getSessionToken(app).then(token => {
        console.log('🪪 Token de sesión:', token);
      });
    } else {
      console.warn('⚠️ No se detectó "host" en la URL, App Bridge no inicializado.');
    }
  }, []);

  return <>{children}</>;
}
