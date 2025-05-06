'use client';

import React from 'react';

export default function DashboardHome() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        paddingBottom: '4rem',
      }}
    >
      {/* Gráfico principal */}
      <section
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '1rem' }}>
          Ventas Recientes
        </h2>
        <div
          style={{
            height: '250px',
            backgroundColor: '#F9FAFB',
            border: '1px dashed #D1D5DB',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9CA3AF',
            fontSize: '0.95rem',
          }}
        >
          Aquí irá el gráfico de ventas con IA 📈
        </div>
      </section>

      {/* Recomendaciones inteligentes */}
      <section
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '1rem' }}>
          Recomendaciones Inteligentes
        </h2>
        <p style={{ fontSize: '1rem', color: '#6B7280' }}>
          Conecta tu tienda para recibir sugerencias impulsadas por IA sobre qué productos lanzar,
          qué textos optimizar y cómo aumentar conversiones.
        </p>
      </section>
    </div>
  );
}
