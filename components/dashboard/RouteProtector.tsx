'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import SignInClient from '@/app/sign-in/[[...rest]]/SignInClient'; // Ajusta la ruta si es diferente

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
      // Si estamos embebidos pero faltan parámetros, redirigimos al flujo correcto
      router.replace(`/api/redirect-entry?redirectTo=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!isSignedIn) {
      // Si no está autenticado y estamos embebidos, mostramos login embebido
      if (embedded || isIframe) {
        setShowLogin(true);
        return;
      }

      // Si no estamos embebidos, redirigir a la landing (opcionalmente a /sign-in si lo prefieres)
      router.replace('/');
    }
  }, [isLoaded, isSignedIn, searchParams, pathname, router]);

  // Renderiza login embebido si aplica
  if (showLogin) {
    return <SignInClient />;
  }

  return null;
}
