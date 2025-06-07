'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import createApp from '@shopify/app-bridge';
import { Redirect } from '@shopify/app-bridge/actions';

export default function EmbeddedPageClient() {
  const searchParams = useSearchParams();
  const shop = searchParams.get('shop') || '';
  const host = searchParams.get('host') || '';

  useEffect(() => {
    if (!host || !shop) return;

    // ✅ Inicializa App Bridge con redirección forzada si no está en iframe
    const app = createApp({
      apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
      host,
      forceRedirect: true,
    });

    // ✅ Redirige internamente a tu dashboard dentro del entorno embebido
    Redirect.create(app).dispatch(
      Redirect.Action.ADMIN_PATH,
      `/dashboard?shop=${shop}&host=${host}&embedded=1`
    );
  }, [host, shop]);

  return <div>Redirigiendo a la app embebida...</div>;
}
