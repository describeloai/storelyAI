'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import createApp from '@shopify/app-bridge';
import { Redirect } from '@shopify/app-bridge/actions';

export default function EmbeddedPageClient() {
  const searchParams = useSearchParams();
  const host = searchParams.get('host') || '';
  const shop = searchParams.get('shop') || '';

  useEffect(() => {
    if (host) {
      const app = createApp({
        apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
        host,
        forceRedirect: true, // clave para redirigir si está fuera del iframe
      });

      Redirect.create(app).dispatch(Redirect.Action.ADMIN_PATH, '/dashboard');
    }
  }, [host]);

  return <div>Redirigiendo a la app embebida...</div>;
}
