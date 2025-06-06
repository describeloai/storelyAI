'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function EmbeddedRedirectHandler() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const shop = params.get('shop');
    const host = params.get('host');

    if (shop && host) {
      router.replace(`/dashboard?shop=${shop}&host=${host}&embedded=1`);
    }
  }, [params, router]);

  return <p>Cargando app embebida...</p>;
}

export default function EmbeddedPage() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <EmbeddedRedirectHandler />
    </Suspense>
  );
}
