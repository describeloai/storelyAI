'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function EmbeddedRedirector() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const isIframe = typeof window !== 'undefined' && window.top !== window.self;
    const embedded = searchParams.get('embedded') === '1';

    // No redirigir en rutas especiales como /redirect-entry o /sign-in
    const excludedPaths = ['/redirect-entry', '/sign-in', '/sign-up'];
    if (excludedPaths.includes(pathname)) return;

    if (isIframe && !embedded) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('embedded', '1');

      const redirectUrl = `${pathname}?${newParams.toString()}`;
      console.log('🔁 Redirigiendo a:', redirectUrl);
      router.replace(redirectUrl);
    }
  }, [pathname, searchParams, router]);

  return null;
}
