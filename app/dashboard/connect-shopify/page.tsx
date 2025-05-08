'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ConnectShopifyPage() {
  const [shopDomain, setShopDomain] = useState('');

  const handleConnect = () => {
    if (!shopDomain) return;
    const formattedShop = shopDomain.includes('.myshopify.com')
      ? shopDomain
      : `${shopDomain}.myshopify.com`;
    window.location.href = `/api/shopify/auth?shop=${formattedShop}`;
  };

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '640px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Image src="/logos/shopify-white.png" alt="Shopify" width={40} height={40} />
        <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>Conectar tu tienda Shopify</h2>
      </div>

      <p style={{ marginBottom: '2rem', fontSize: '1rem', color: '#555' }}>
        Conecta tu tienda de Shopify con StorelyAI para sincronizar productos, automatizar descripciones
        y obtener recomendaciones inteligentes con IA.
      </p>

      <input
        type="text"
        placeholder="mitienda o mitienda.myshopify.com"
        value={shopDomain}
        onChange={(e) => setShopDomain(e.target.value)}
        style={{
          width: '100%',
          padding: '1rem 1.2rem',
          fontSize: '1rem',
          borderRadius: '999px',
          border: '1px solid #ddd',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          outline: 'none',
          marginBottom: '1.5rem',
        }}
      />

      <button
        onClick={handleConnect}
        disabled={!shopDomain}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: '999px',
          border: '2px solid #30C75D',
          color: '#30C75D',
          background: '#fff',
          cursor: shopDomain ? 'pointer' : 'not-allowed',
          opacity: shopDomain ? 1 : 0.6,
          transition: 'all 0.2s ease',
        }}
      >
        Conectar ahora
      </button>
    </div>
  );
}
