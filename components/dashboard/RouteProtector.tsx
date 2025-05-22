'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function RouteProtector() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoaded) return;

    const host = searchParams.get('host');
    const shop = searchParams.get('shop');
    const embedded = searchParams.get('embedded') === '1';
    const isIframe = typeof window !== 'undefined' && window.top !== window.self;

    const mustRedirect = (embedded || isIframe) && (!host || !shop);

    // 🔁 Reparar contexto si falta host/shop
    if (mustRedirect) {
      const fixedRedirect = `/api/redirect-entry?redirectTo=${encodeURIComponent(pathname)}`;
      console.warn('🔁 Redireccionando para reconstruir el contexto embebido:', fixedRedirect);
      router.replace(fixedRedirect);
      return;
    }

    // 🔐 Si no está autenticado, redirigir a /sign-in con los mismos parámetros
    if (!isSignedIn) {
      const params = new URLSearchParams();
      if (host) params.set('host', host);
      if (shop) params.set('shop', shop);
      if (embedded || isIframe) params.set('embedded', '1');
      params.set('redirect_url', pathname);

      const redirectPath = `/sign-in?${params.toString()}`;
      console.warn('🔐 Redirigiendo a login:', redirectPath);
      router.replace(redirectPath);
    }
  }, [isLoaded, isSignedIn, searchParams, pathname, router]);

  return null;
}
