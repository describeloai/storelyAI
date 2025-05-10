'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function IntegrationsPage() {
  const { user } = useUser();
  const router = useRouter();

  // @ts-ignore
  const shop = user?.privateMetadata?.shop as string | undefined;
  // @ts-ignore
  const accessToken = user?.privateMetadata?.accessToken as string | undefined;

  const [disconnected, setDisconnected] = useState(false);
  const isConnected = !!(shop && accessToken) && !disconnected;

  const handleDisconnect = async () => {
    try {
      const res = await fetch('/api/user/saveShopifyToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          shop: '',
          accessToken: '',
        }),
      });

      if (res.ok) {
        setDisconnected(true);
      } else {
        console.error('❌ No se pudo desconectar');
      }
    } catch (err) {
      console.error('❌ Error al desconectar:', err);
    }
  };

  const handleReconnect = () => {
    router.push('/dashboard/connect-shopify');
  };

  return (
    <div style={{ padding: '3rem', maxWidth: '640px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Integraciones con Shopify
      </h2>

      {isConnected ? (
        <>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            <strong>Tienda conectada:</strong> {shop}
          </p>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleDisconnect}
              style={{
                padding: '0.8rem 1.4rem',
                background: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Desconectar tienda
            </button>

            <button
              onClick={handleReconnect}
              style={{
                padding: '0.8rem 1.4rem',
                background: '#6366f1',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cambiar cuenta de Shopify
            </button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem' }}>
            No hay ninguna tienda conectada actualmente.
          </p>
          <button
            onClick={handleReconnect}
            style={{
              padding: '0.8rem 1.4rem',
              background: '#30C75D',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1rem',
            }}
          >
            <Image src="/logos/shopify.png" alt="Shopify" width={20} height={20} />
            Conectar Shopify
          </button>
        </div>
      )}
    </div>
  );
}
