'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function FinishAuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { getToken } = useAuth();

  useEffect(() => {
    const shop = searchParams.get('shop');
    const accessToken = searchParams.get('accessToken');

    const saveMetadata = async () => {
      const sessionToken = await getToken();
      if (!sessionToken || !shop || !accessToken) return;

      const res = await fetch('/api/shopify/save-token', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shop, accessToken }),
      });

      if (res.ok) {
        console.log('✅ Metadata guardada');
        router.push('/dashboard');
      } else {
        console.error('❌ Error al guardar metadata');
        router.push('/error');
      }
    };

    saveMetadata();
  }, [searchParams]);

  return <p>Finalizando autenticación...</p>;
}
