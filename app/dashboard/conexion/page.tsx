'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function ShopifyConexionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { userId } = useAuth();

  useEffect(() => {
    const shop = searchParams?.get('shop') ?? null;
    const token = searchParams?.get('token') ?? null;

    console.log("🔍 Entrando a useEffect de ShopifyConexionPage");
    console.log("➡️ shop:", shop);
    console.log("➡️ token:", token);
    console.log("➡️ userId:", userId);

    if (!shop || !token || !userId) {
      console.warn('❌ Faltan datos para guardar Shopify. No se redirige.');
      return;
    }

    console.log("✅ Ejecutando fetch con:", { shop, token, userId });

    fetch('/api/user/saveShopifyToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop,
        accessToken: token,
        userId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log('✅ Shopify guardado en Clerk');

          // ✅ Fallback por si Clerk no actualiza de inmediato en el cliente
          localStorage.setItem('storelyShopifyConnected', 'true');

          router.refresh();

          // Esperamos a que router.refresh() surta efecto
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
  }, [searchParams, router, userId]);

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
