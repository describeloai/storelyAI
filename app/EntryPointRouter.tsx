'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EntryPointRouter({ onRedirect }: { onRedirect: () => void }) {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const shop = params.get('shop');
    const host = params.get('host');
    const isEmbedded = params.get('embedded');

    if (shop && host && isEmbedded === '1') {
      const url = `/dashboard?shop=${shop}&host=${host}&embedded=1`;
      router.replace(url);
      onRedirect();
    }
  }, [params, router, onRedirect]);

  return null;
}
