'use client';

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type SalesData = {
  date: string;
  sales: number;
};

export default function DashboardHome() {
  const [data, setData] = useState<SalesData[]>([]);

  useEffect(() => {
    // Aquí puedes traer los datos reales del usuario conectado
    // Por ahora se usan datos mock de ejemplo
    const fetchData = async () => {
      const mockData = [
        { date: '01 May', sales: 240 },
        { date: '02 May', sales: 320 },
        { date: '03 May', sales: 180 },
        { date: '04 May', sales: 290 },
        { date: '05 May', sales: 400 },
      ];
      setData(mockData);
    };

    fetchData();
  }, []);

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
            border: '1px solid #E5E7EB',
            borderRadius: '0.5rem',
            padding: '1rem',
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#6366F1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
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
