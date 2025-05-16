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
    const isIframe = window.top !== window.self;

    if (embedded || isIframe) {
      if (!host || !shop) {
        console.warn('🔒 Faltan parámetros, redirigiendo...');
        router.replace(`/api/redirect-entry?redirectTo=${encodeURIComponent(pathname)}`);
        return;
      }
      return;
    }

    if (!isSignedIn) {
      router.replace('/');
    }
  }, [isLoaded, isSignedIn, searchParams, pathname, router]);

  return null;
}
