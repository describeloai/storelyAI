'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function EmbeddedRedirector() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const isIframe = window.top !== window.self;
    const hasEmbeddedParam = searchParams.get('embedded') === '1';
    const shouldRedirect = isIframe && !hasEmbeddedParam;

    if (shouldRedirect) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('embedded', '1');

      // Conserva ruta actual pero con `embedded=1`
      const redirectUrl = `${pathname}?${params.toString()}`;
      console.log('🔁 Redirigiendo con embedded=1 a:', redirectUrl);
      router.replace(redirectUrl);
    }
  }, [pathname, searchParams, router]);

  return null;
}
