// app/dashboard/integraciones/page.tsx
'use client';

import { useState } from 'react';

export default function IntegracionesPage() {
  const [shop, setShop] = useState('');

  const handleConnect = () => {
    if (!shop.endsWith('.myshopify.com')) {
      alert('Dominio inválido');
      return;
    }

    // Redirección al backend para iniciar OAuth con Shopify
    window.location.href = `/api/shopify/auth?shop=${shop}`;
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Conectar tienda Shopify
      </h1>

      <input
        type="text"
        value={shop}
        onChange={(e) => setShop(e.target.value)}
        placeholder="tutienda.myshopify.com"
        style={{
          padding: '0.5rem',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />

      <br />

      <button
        onClick={handleConnect}
        style={{
          padding: '0.5rem 1rem',
          background: '#56b4ef',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Conectar tienda
      </button>
    </div>
  );
}
