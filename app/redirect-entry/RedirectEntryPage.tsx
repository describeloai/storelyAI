'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RedirectEntryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const url = searchParams.get('url');
    if (url) {
      router.push(url);
    } else {
      router.push('/');
    }
  }, [searchParams]);

  return <p>Redireccionando...</p>;
}
