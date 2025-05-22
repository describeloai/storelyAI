'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    ShopifyApp?: {
      redirect: (params: { url: string }) => void;
    };
  }
}

export default function RedirectEntry() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const host = searchParams.get('host');
    const shop = searchParams.get('shop');
    const embedded = searchParams.get('embedded') === '1';
    const redirectTo = searchParams.get('redirectTo') || '/dashboard';

    if (!host || !shop) {
      console.warn('❌ Faltan parámetros "host" o "shop", cancelando redirección.');
      return;
    }

    const url = new URL(redirectTo, window.location.origin);
    url.searchParams.set('shop', shop);
    url.searchParams.set('host', host);
    url.searchParams.set('embedded', '1');

    const finalUrl = url.toString();

    const isIframe = window.top !== window.self;

    const redirectNow = () => {
      if (isIframe && window.ShopifyApp) {
        console.log('✅ Redirección embebida con App Bridge:', finalUrl);
        window.ShopifyApp.redirect({ url: finalUrl });
      } else {
        console.log('🔁 Redirección directa con location.href:', finalUrl);
        window.location.href = finalUrl;
      }
    };

    // ⏳ Espera hasta que ShopifyApp esté disponible (máx 1 segundo)
    let waited = 0;
    const interval = setInterval(() => {
      if (window.ShopifyApp || waited > 1000) {
        clearInterval(interval);
        redirectNow();
      }
      waited += 100;
    }, 100);
  }, [searchParams]);

  return <p style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Redirigiendo...</p>;
}
