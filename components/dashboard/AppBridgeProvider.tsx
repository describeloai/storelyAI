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

    // Inicializar App Bridge solo si tenemos host
    if (host) {
      const app = createApp({
        apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
        host,
        forceRedirect: true,
      });

      (window as any).shopifyApp = app;
      console.log('✅ App Bridge creado y asignado a window.shopifyApp');

      // Obtener y mostrar token
      getSessionToken(app).then(token => {
        console.log('🔑 Token de sesión:', token);
      });
    } else {
      // Si no hay host, redirigir solo si estamos embebidos (dentro de un iframe)
      if (window.top !== window.self) {
        console.warn('⚠️ No se detectó "host", redirigiendo al flujo de entrada para recuperarlo...');
        const currentUrl = window.location.href;
        window.location.href = `/api/redirect-entry?redirectTo=${encodeURIComponent(currentUrl)}`;
      } else {
        console.log('🧭 No se detectó "host", pero estamos en modo standalone. No se redirige.');
      }
    }
  }, []);

  return <>{children}</>;
}
