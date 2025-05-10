'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useShopifyConnectionStatus } from '@/lib/useShopifyConnectionStatus';
import { useState } from 'react';

export default function IntegrationsPage() {
  const router = useRouter();
  const { isConnected, shopDomain } = useShopifyConnectionStatus();

  const handleConnect = () => {
    router.push('/dashboard/connect-shopify');
  };

  const handleDisconnect = () => {
    localStorage.removeItem('storelyShopifyConnected');
    router.refresh();
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
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={handleDisconnect}
              style={{
                backgroundColor: '#E11D48',
                color: '#fff',
                border: 'none',
                padding: '0.5rem 1.2rem',
                borderRadius: '0.5rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Desconectar tienda
            </button>
            <button
              onClick={handleConnect}
              style={{
                backgroundColor: '#4F46E5',
                color: '#fff',
                border: 'none',
                padding: '0.5rem 1.2rem',
                borderRadius: '0.5rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Cambiar cuenta de Shopify
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
