'use client';

import { useEffect } from 'react';
import { getSessionToken } from '@shopify/app-bridge-utils';

export default function AppBridgeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    let host = query.get('host');

    if (host) {
      sessionStorage.setItem('shopify-host', host);
    } else {
      host = sessionStorage.getItem('shopify-host') || '';
    }

    console.log('🧩 HOST en AppBridgeProvider:', host);

    const AppBridgeConstructor = (window as any).appBridge || (window as any).ShopifyApp;

    if (host && AppBridgeConstructor) {
      try {
        const app = AppBridgeConstructor({
          apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
          host,
          forceRedirect: true,
        });

        (window as any).shopifyApp = app;
        console.log('✅ App Bridge inicializado desde CDN y asignado a window.shopifyApp');

        getSessionToken(app).then(token => {
          console.log('🔑 Token de sesión:', token);
        });
      } catch (error) {
        console.error('❌ Error al inicializar App Bridge desde CDN:', error);
      }
    } else if (!host && window.top !== window.self) {
      console.warn('⚠️ No se detectó "host", redirigiendo al flujo de entrada para recuperarlo...');
      const currentUrl = window.location.href;
      window.location.href = `/redirect-entry?redirectTo=${encodeURIComponent(currentUrl)}`;
    } else {
      console.log('🧭 No se detectó "host", pero estamos en modo standalone. No se redirige.');
    }
  }, []);

  return <>{children}</>;
}
