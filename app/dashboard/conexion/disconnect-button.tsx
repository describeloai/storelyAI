'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export function DisconnectShopifyButton() {
  const { getToken } = useAuth();
  const router = useRouter();

  const handleDisconnect = async () => {
    try {
      const token = await getToken();

      const res = await fetch('/api/shopify/disconnect', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // 🔐 token seguro de Clerk
        },
      });

      if (res.ok) {
        localStorage.removeItem('storelyShopifyConnected');
        router.refresh();
        setTimeout(() => {
          router.push('/dashboard');
        }, 300);
      } else {
        console.error('❌ Falló la desconexión');
      }
    } catch (err) {
      console.error('❌ Error en la desconexión:', err);
    }
  };

  return (
    <button
      onClick={handleDisconnect}
      style={{
        background: '#e53e3e',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: 'none',
      }}
    >
      Desconectar Shopify
    </button>
  );
}
