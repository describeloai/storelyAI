'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function EmbeddedRedirector() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const isEmbedded = searchParams.get('embedded') === '1';

    if (isEmbedded && pathname === '/') {
      const params = new URLSearchParams(searchParams.toString());
      router.replace(`/dashboard?${params.toString()}`);
    }
  }, [pathname, searchParams, router]);

  return null;
}
