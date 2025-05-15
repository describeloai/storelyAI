'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function RouteProtector() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const host = searchParams.get('host');
  const shop = searchParams.get('shop');
  const embedded = searchParams.get('embedded') === '1';

  useEffect(() => {
    if (!isLoaded) return;

    const isIframe = window.top !== window.self;

    if (embedded || isIframe) {
      // Modo embebido: requiere host/shop
      if (!host || !shop) {
        console.warn('🔒 Faltan parámetros, redirigiendo...');
        router.replace(`/api/redirect-entry?redirectTo=${encodeURIComponent(pathname)}`);
        return;
      }
      // OK: app embebida y con parámetros
      return;
    }

    // Modo navegador: requiere estar logueado
    if (!isSignedIn) {
      router.replace('/');
    }
  }, [isLoaded, isSignedIn, host, shop, embedded, pathname]);

  return null; // No renderiza nada, solo controla acceso
}
