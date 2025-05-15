'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function EmbeddedRedirector() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isEmbedded = searchParams.get('embedded') === '1';

  useEffect(() => {
    // Si estamos embebidos y en la landing, redirigimos al dashboard
    if (isEmbedded && pathname === '/') {
      const params = new URLSearchParams(searchParams.toString());
      router.replace(`/dashboard?${params.toString()}`);
    }
  }, [isEmbedded, pathname]);

  return null;
}
