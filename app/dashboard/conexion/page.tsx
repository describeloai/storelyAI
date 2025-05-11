'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function ShopifyConexionPage() {
  const searchParams = useSearchParams();
  const { getToken } = useAuth();

  const [estado, setEstado] = useState<'cargando' | 'redirigiendo' | 'fallo'>('cargando');

  useEffect(() => {
    const connect = async () => {
      const shop = searchParams?.get('shop');
      const accessToken = searchParams?.get('token');

      if (!shop || !accessToken) {
        console.warn('❌ Faltan datos en la URL.');
        setEstado('fallo');
        return;
      }

      try {
        const token = await getToken();
        if (!token) {
          console.warn('❌ No se obtuvo token de Clerk.');
          setEstado('fallo');
          return;
        }

        console.log('🛠 Enviando a /api/shopify/save-token:', { shop, accessToken });

        const res = await fetch('/api/shopify/save-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ shop, accessToken }),
        });

        if (res.ok) {
          localStorage.setItem('storelyShopifyConnected', 'true');
          setEstado('redirigiendo');
          setTimeout(() => {
            window.location.href = '/dashboard'; // 🔁 recarga completa con Clerk actualizado
          }, 300);
        } else {
          console.error('❌ Error al guardar en Clerk:', await res.json());
          setEstado('fallo');
        }
      } catch (err) {
        console.error('❌ Error al conectar con Shopify:', err);
        setEstado('fallo');
      }
    };

    connect();
  }, [searchParams, getToken]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.1rem',
        fontWeight: 500,
        textAlign: 'center',
      }}
    >
      {estado === 'cargando' && '🚀 Conectando tu tienda Shopify con StorelyAI...'}
      {estado === 'redirigiendo' && '✅ Conexión exitosa, redirigiendo...'}
      {estado === 'fallo' && '❌ Error al conectar. Revisa los datos o vuelve a intentarlo.'}
    </div>
  );
}
