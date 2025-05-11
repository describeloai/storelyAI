'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function IntegrationsPage() {
  const [shopDomain, setShopDomain] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    if (!shopDomain) return;

    const formattedShop = shopDomain.includes('.myshopify.com')
      ? shopDomain
      : `${shopDomain}.myshopify.com`;

    setLoading(true);
    window.location.href = `/api/shopify/auth?shop=${formattedShop}`;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '4rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          padding: '4rem',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <Image
            src="/logos/shopify-white.png"
            alt="Shopify"
            width={64}
            height={64}
            style={{
              backgroundColor: '#30C75D',
              padding: '12px',
              borderRadius: '14px',
              display: 'inline-block',
            }}
          />
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Conecta tu tienda Shopify
        </h1>

        <p style={{ fontSize: '1rem', color: '#666', marginBottom: '2rem' }}>
          Conecta tu tienda y empieza a sincronizar productos, automatizar tareas y recibir insights inteligentes con StorelyAI.
        </p>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="tu-tienda o tu-tienda.myshopify.com"
            value={shopDomain}
            onChange={(e) => setShopDomain(e.target.value)}
            style={{
              flex: 1,
              padding: '1rem 1.2rem',
              borderRadius: '999px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              outline: 'none',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
            }}
          />
          <button
            onClick={handleConnect}
            disabled={!shopDomain || loading}
            style={{
              padding: '0.8rem 1.5rem',
              backgroundColor: '#30C75D',
              border: 'none',
              borderRadius: '999px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: shopDomain ? 'pointer' : 'not-allowed',
              opacity: shopDomain ? 1 : 0.6,
              transition: 'background 0.3s ease',
            }}
          >
            {loading ? 'Conectando...' : 'Conectar'}
          </button>
        </div>

        <p style={{ fontSize: '0.95rem', color: '#aaa' }}>
          ¿No tienes una tienda aún? <a href="https://www.shopify.com" target="_blank" style={{ color: '#30C75D', textDecoration: 'none' }}>Crea una gratis</a>.
        </p>
      </div>
    </div>
  );
}
