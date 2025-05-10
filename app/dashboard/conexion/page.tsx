'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ShopifyConexionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const shop = searchParams?.get('shop') ?? null;
    const token = searchParams?.get('token') ?? null;

    if (!shop || !token) {
      console.warn('❌ Faltan datos para guardar Shopify. No se redirige.');
      return;
    }

    fetch('/api/shopify/save-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop,
        accessToken: token,
      }),
    })
      .then((res) => {
        if (res.ok) {
          localStorage.setItem('storelyShopifyConnected', 'true');
          router.refresh();
          setTimeout(() => {
            router.push('/dashboard');
          }, 300);
        } else {
          console.error('❌ No se pudo guardar en Clerk');
          router.push('/dashboard');
        }
      })
      .catch((err) => {
        console.error('❌ Error al guardar:', err);
        router.push('/dashboard');
      });
  }, [searchParams, router]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.1rem',
        fontWeight: 500,
      }}
    >
      Conectando con Shopify...
    </div>
  );
}
