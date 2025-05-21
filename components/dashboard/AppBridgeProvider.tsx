'use client';

import { useEffect } from 'react';
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

    // Verificar si el script de la CDN ya ha cargado App Bridge en window
    const AppBridgeConstructor = (window as any).appBridge || (window as any).ShopifyApp;

    if (host && AppBridgeConstructor) {
      try {
        const app = AppBridgeConstructor.default?.({
          apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
          host,
          forceRedirect: true,
        });

        (window as any).shopifyApp = app;
        console.log('✅ App Bridge inicializado desde CDN y asignado a window.shopifyApp');

        // Obtener y mostrar token
        getSessionToken(app).then(token => {
          console.log('🔑 Token de sesión:', token);
        });
      } catch (error) {
        console.error('❌ Error al inicializar App Bridge desde CDN:', error);
      }
    } else if (!host && window.top !== window.self) {
      // Si no hay host y estamos embebidos (iframe)
      console.warn('⚠️ No se detectó "host", redirigiendo al flujo de entrada para recuperarlo...');
      const currentUrl = window.location.href;
      window.location.href = `/api/redirect-entry?redirectTo=${encodeURIComponent(currentUrl)}`;
    } else {
      console.log('🧭 No se detectó "host", pero estamos en modo standalone. No se redirige.');
    }
  }, []);

  return <>{children}</>;
}
