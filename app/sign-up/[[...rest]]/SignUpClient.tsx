'use client';

import { SignUp } from '@clerk/nextjs';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser, useAuth } from '@clerk/nextjs';
import { useEffect, useMemo } from 'react';

export default function SignUpClient() {
  const { isSignedIn } = useUser();
  const { isLoaded } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const redirectUrl = searchParams.get('redirect_url') || '/dashboard';
  const host = searchParams.get('host');
  const shop = searchParams.get('shop');
  const embedded = searchParams.get('embedded');

  const finalRedirectUrl = useMemo(() => {
    const url = new URL(redirectUrl, window.location.origin);
    if (host) url.searchParams.set('host', host);
    if (shop) url.searchParams.set('shop', shop);
    if (embedded) url.searchParams.set('embedded', embedded);
    return url.toString();
  }, [redirectUrl, host, shop, embedded]);

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      console.log('✅ Usuario registrado y autenticado, redirigiendo a:', finalRedirectUrl);
      router.replace(finalRedirectUrl);
    }
  }, [isSignedIn, isLoaded, finalRedirectUrl, router]);

  if (!isLoaded || isSignedIn) return null;

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom right, #4B0082, #8A2BE2)',
      }}
    >
      <SignUp fallbackRedirectUrl={finalRedirectUrl} />
    </div>
  );
}
