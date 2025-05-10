'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useShopifyConnectionStatus } from '@/lib/useShopifyConnectionStatus';
import { useState } from 'react';

export default function IntegrationsPage() {
  const router = useRouter();
  const { isConnected, shopDomain } = useShopifyConnectionStatus();
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    router.push('/dashboard/connect-shopify');
  };

  const handleDisconnect = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/shopify/disconnect', {
        method: 'POST',
      });

      if (res.ok) {
        setTimeout(() => {
          router.refresh();
        }, 500);
      } else {
        console.error('Error al desconectar tienda');
      }
    } catch (err) {
      console.error('Error al hacer la petición:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Integraciones con Shopify
      </h1>

      {isConnected ? (
        <>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>Tienda conectada:</strong> {shopDomain}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleDisconnect}
              disabled={loading}
              style={{
                backgroundColor: '#E11D48',
                color: '#fff',
                border: 'none',
                padding: '0.5rem 1.2rem',
                borderRadius: '0.5rem',
                fontWeight: 500,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Desconectando...' : 'Desconectar tienda'}
            </button>
          </div>
        </>
      ) : (
        <>
          <p style={{ marginBottom: '1rem' }}>No hay ninguna tienda conectada actualmente.</p>
          <button
            onClick={handleConnect}
            style={{
              backgroundColor: '#30C75D',
              color: '#fff',
              border: 'none',
              padding: '0.6rem 1.4rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              margin: '0 auto'
            }}
          >
            <Image src="/logos/shopify.png" alt="Shopify" width={20} height={20} />
            Conectar Shopify
          </button>
        </>
      )}
    </div>
  );
}
