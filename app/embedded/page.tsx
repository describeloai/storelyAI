'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EmbeddedRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const shop = searchParams.get('shop');
    const host = searchParams.get('host');

    if (shop && host) {
      const embeddedUrl = `/dashboard?shop=${shop}&host=${host}&embedded=1`;
      router.replace(embeddedUrl);
    }
  }, [searchParams, router]);

  return <p>Redirigiendo a app embebida...</p>;
}
