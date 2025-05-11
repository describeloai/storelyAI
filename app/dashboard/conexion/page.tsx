'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function ShopifyConexionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { getToken } = useAuth();

  useEffect(() => {
    const connect = async () => {
      const shop = searchParams?.get('shop') ?? null;
      const accessToken = searchParams?.get('token') ?? null;

      if (!shop || !accessToken) {
        console.warn('❌ Faltan datos para guardar Shopify. No se redirige.');
        return;
      }
      console.log('🔄 Despliegue forzado');

      const token = await getToken();
      console.log('🔐 Clerk token:', token);

      const res = await fetch('/api/shopify/save-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ✅ token de Clerk
        },
        body: JSON.stringify({
          shop,
          accessToken, // ✅ token de Shopify
        }),
      });

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
    };

    connect().catch((err) => {
      console.error('❌ Error al guardar:', err);
      router.push('/dashboard');
    });
  }, [searchParams, router, getToken]);

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
