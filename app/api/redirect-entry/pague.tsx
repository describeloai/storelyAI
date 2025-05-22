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
    if (embedded) url.searchParams.set('embedded', '1');

    const finalUrl = url.toString();

    if (embedded && window.top !== window.self && window.ShopifyApp) {
      console.log('✅ Redirección embebida con ShopifyApp:', finalUrl);
      window.ShopifyApp.redirect({ url: finalUrl });
    } else {
      console.log('➡️ Redirección normal con window.location.href:', finalUrl);
      window.location.href = finalUrl;
    }
  }, [searchParams]);

  return <p>Redirigiendo...</p>;
}
