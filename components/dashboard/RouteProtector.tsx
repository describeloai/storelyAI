'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import SignInClient from '@/app/sign-in/[[...rest]]/SignInClient';

export default function RouteProtector() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const host = searchParams.get('host');
    const shop = searchParams.get('shop');
    const embedded = searchParams.get('embedded') === '1';
    const isIframe = window.top !== window.self;

    if ((embedded || isIframe) && (!host || !shop)) {
      // Faltan parámetros embebidos → reconstruirlos
      router.replace(`/api/redirect-entry?redirectTo=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!isSignedIn) {
      // Si no está logueado y estamos embebidos, ir a /sign-in con los mismos params
      if (embedded || isIframe) {
        const params = new URLSearchParams();
        if (host) params.set('host', host);
        if (shop) params.set('shop', shop);
        if (embedded) params.set('embedded', '1');
        params.set('redirect_url', pathname);

        router.replace(`/sign-in?${params.toString()}`);
        return;
      }

      // Si no estamos embebidos, ir a home o /sign-in estándar
      router.replace('/');
    }
  }, [isLoaded, isSignedIn, searchParams, pathname, router]);

  if (!isSignedIn && showLogin) {
    return <SignInClient />;
  }

  return null;
}
