'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadShopifyBridge } from '@/lib/shopify/shopifyBridge';

export default function EmbeddedAppPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const shop = params.get('shop');
    const host = params.get('host');

    if (!shop || !host) {
      console.error('Faltan parámetros "shop" o "host"');
      return;
    }

    // ⚙️ Cargar Shopify Bridge desde CDN
    loadShopifyBridge({
      apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
      host,
    });

    // Redirige al dashboard dentro del entorno embebido
    router.replace(`/dashboard?shop=${shop}&host=${host}&embedded=1`);
  }, [params, router]);

  return <p>Cargando app embebida...</p>;
}
