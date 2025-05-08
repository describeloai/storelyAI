'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function ShopifyConexionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { userId } = useAuth();

  useEffect(() => {
    const shop = searchParams.get('shop');
    const token = searchParams.get('token');

    if (!shop || !token || !userId) {
      console.warn('Faltan datos para guardar Shopify');
      return;
    }

    // 1. Guardar cookies manualmente (opcional pero útil para reutilizar)
    document.cookie = `shopifyShop=${shop}; path=/; max-age=300`;
    document.cookie = `shopifyToken=${token}; path=/; max-age=300`;

    // 2. Llamar al endpoint para guardar en Clerk
    fetch('/api/user/saveShopifyToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId,
      },
      body: JSON.stringify({
        shop,
        accessToken: token,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log('✅ Shopify guardado en Clerk');
        } else {
          console.error('❌ No se pudo guardar en Clerk');
        }
        // 3. Redirigir al dashboard
        router.push('/dashboard');
      })
      .catch((err) => {
        console.error('Error al conectar con API:', err);
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
