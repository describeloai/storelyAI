'use client';

import { useEffect } from 'react';
import createApp from '@shopify/app-bridge';
import { getSessionToken } from '@shopify/app-bridge-utils';

export default function AppBridgeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const shop = query.get('shop');
    const host = query.get('host');

    if (shop && host) {
      const app = createApp({
        apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
        host,
        forceRedirect: true,
      });
     getSessionToken(app).then((token: string) => {
  console.log('🪪 Token de sesión obtenido:', token);
});
    }
  }, []);

  return <>{children}</>;
}
