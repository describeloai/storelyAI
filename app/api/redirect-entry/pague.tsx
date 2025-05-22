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
    const redirectTo = searchParams.get('redirectTo') || '/dashboard';
    const embedded = searchParams.get('embedded');

    const finalUrl = `${window.location.origin}${redirectTo}?shop=${shop}&host=${host}`;

    if (embedded === '1' && window.top !== window.self && window.ShopifyApp) {
      console.log('✅ Redirección embebida con ShopifyApp');
      window.ShopifyApp.redirect({ url: finalUrl });
    } else {
      console.log('➡️ Redirección normal con window.location.href');
      window.location.href = finalUrl;
    }
  }, [searchParams]);

  return <p>Redirigiendo...</p>;
}
