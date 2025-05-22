'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import SignInClient from '@/app/sign-in/[[...rest]]/SignInClient'; // Ajusta si es necesario

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

    const redirectTo = `${pathname}?${searchParams.toString()}`;

    // Si está embebido pero faltan parámetros, redirigir al flujo de entrada
    if ((embedded || isIframe) && (!host || !shop)) {
      router.replace(`/redirect-entry?redirectTo=${encodeURIComponent(redirectTo)}`);
      return;
    }

    // Si no está autenticado
    if (!isSignedIn) {
      if (embedded || isIframe) {
        // Mostrar login embebido
        setShowLogin(true);
        return;
      }

      // Redirigir a la landing page fuera de embed
      router.replace('/');
    }
  }, [isLoaded, isSignedIn, searchParams, pathname, router]);

  if (showLogin) {
    return <SignInClient />;
  }

  return null;
}
