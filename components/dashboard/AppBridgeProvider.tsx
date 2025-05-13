'use client';

import { useEffect } from 'react';
import createApp from '@shopify/app-bridge';
import { getSessionToken } from '@shopify/app-bridge-utils';

export default function AppBridgeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const host = query.get('host');

    if (host) {
      const app = createApp({
        apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
        host,
        forceRedirect: true,
      });

      // ✅ Exponer la instancia globalmente para que Shopify la detecte
      (window as any).app = app;

      // Solo como ejemplo: token de sesión para proteger rutas
      getSessionToken(app).then(async (token: string) => {
        console.log('🪪 Token de sesión obtenido:', token);

        const res = await fetch('/api/secure', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        console.log('🔐 Respuesta del backend:', json);
      });
    }
  }, []);

  return <>{children}</>;
}
