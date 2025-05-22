'use client';

import { useEffect } from 'react';
import { getSessionToken } from '@shopify/app-bridge-utils';

export default function AppBridgeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    let shop = query.get('shop');

    if (shop) {
      sessionStorage.setItem('shopify-shop', shop);
    } else {
      shop = sessionStorage.getItem('shopify-shop') || '';
    }

    const isIframe = window.top !== window.self;
    const embedded = query.get('embedded') === '1';
    const ShopifyApp = (window as any).ShopifyApp;

    if (!shop && isIframe) {
      console.warn('⚠️ Falta "shop" en iframe embebido, redirigiendo a /redirect-entry...');
      const currentUrl = window.location.href;
      window.location.href = `/redirect-entry?redirectTo=${encodeURIComponent(currentUrl)}`;
      return;
    }

    if (shop && ShopifyApp && embedded) {
      try {
        ShopifyApp.init({
          apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
          shopOrigin: `https://${shop}`,
          forceRedirect: true,
        });

        console.log('✅ App Bridge (CDN) inicializado correctamente');
      } catch (error) {
        console.error('❌ Error al inicializar App Bridge desde CDN:', error);
      }
    } else {
      if (!ShopifyApp && isIframe) {
        console.warn('⚠️ ShopifyApp no está disponible en iframe. ¿Falta el script de la CDN?');
      } else {
        console.log('🧭 App fuera de iframe o sin contexto embebido. No se inicializa App Bridge.');
      }
    }
  }, []);

  return <>{children}</>;
}
