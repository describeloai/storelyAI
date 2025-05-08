'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function ConexionPage() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const shop = getCookie('shopifyShop');
    const token = getCookie('shopifyToken');

    if (shop && token) {
      fetch('/api/user/saveShopifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          shop,
          accessToken: token,
        }),
      })
        .then(() => {
          // Limpiar cookies
          document.cookie = 'shopifyShop=; Max-Age=0; path=/';
          document.cookie = 'shopifyToken=; Max-Age=0; path=/';

          // Redirigir al dashboard
          window.location.href = '/dashboard';
        })
        .catch((err) => {
          console.error('Error guardando token en Clerk:', err);
        });
    }
  }, [user, isLoaded]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Conectando tu tienda Shopify...</h2>
      <p>Por favor espera unos segundos mientras completamos la vinculación.</p>
    </div>
  );
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}
