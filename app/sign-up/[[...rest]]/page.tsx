'use client';

import { SignUp } from '@clerk/nextjs';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect, useMemo } from 'react';
import { useIsEmbedded } from '@/hooks/useIsEmbedded';

export default function SignUpClient() {
  const { isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isEmbedded = useIsEmbedded();

  const redirectUrl = searchParams.get('redirect_url') || '/dashboard';
  const host = searchParams.get('host');
  const shop = searchParams.get('shop');
  const embedded = searchParams.get('embedded');

  const finalRedirectUrl = useMemo(() => {
    if (typeof window === 'undefined') return redirectUrl;
    const url = new URL(redirectUrl, window.location.origin);
    if (host) url.searchParams.set('host', host);
    if (shop) url.searchParams.set('shop', shop);
    if (embedded) url.searchParams.set('embedded', embedded);
    return url.toString();
  }, [redirectUrl, host, shop, embedded]);

  useEffect(() => {
    if (isSignedIn) {
      router.push(finalRedirectUrl);
    }
  }, [isSignedIn, finalRedirectUrl, router]);

  if (isSignedIn || isEmbedded) return null;

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
