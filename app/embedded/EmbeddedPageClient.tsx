'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadShopifyBridge } from '@/lib/shopify/shopifyBridge';

export default function EmbeddedPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const host = searchParams.get('host') || '';
  const shop = searchParams.get('shop') || '';

  useEffect(() => {
    if (host) {
      loadShopifyBridge({
        apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
        host,
      });

      // opcional: podrías redirigir automáticamente a tu dashboard
      router.replace(`/dashboard?shop=${shop}&host=${host}&embedded=1`);
    }
  }, [host, shop, router]);

  return <div>Redirigiendo al dashboard...</div>;
}
