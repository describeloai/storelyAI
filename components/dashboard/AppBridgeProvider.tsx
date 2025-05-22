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

    console.log('🧩 SHOP en AppBridgeProvider:', shop);

    const ShopifyApp = (window as any).ShopifyApp;

    if (shop && ShopifyApp) {
      try {
        ShopifyApp.init({
          apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
          shopOrigin: `https://${shop}`,
          forceRedirect: true,
        });

        console.log('✅ App Bridge (CDN) inicializado correctamente con shopOrigin');
      } catch (error) {
        console.error('❌ Error al inicializar App Bridge desde CDN:', error);
      }
    } else if (!shop && window.top !== window.self) {
      console.warn('⚠️ No se detectó "shop", redirigiendo a redirect-entry para recuperarlo...');
      const currentUrl = window.location.href;
      window.location.href = `/redirect-entry?redirectTo=${encodeURIComponent(currentUrl)}`;
    } else {
      console.log('🧭 No se detectó "shop", pero estamos fuera del iframe. No se redirige.');
    }
  }, []);

  return <>{children}</>;
}
