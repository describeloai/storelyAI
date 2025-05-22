'use client';

import { SignIn } from '@clerk/nextjs';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SignInClient() {
  const { isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  const redirectUrl = searchParams.get('redirect_url') || '/dashboard';
  const host = searchParams.get('host');
  const shop = searchParams.get('shop');
  const embedded = searchParams.get('embedded');

  const buildRedirectUrl = () => {
    const base = redirectUrl;
    const params = new URLSearchParams();
    if (host) params.set('host', host);
    if (shop) params.set('shop', shop);
    if (embedded) params.set('embedded', embedded);
    return `${base}?${params.toString()}`;
  };

  useEffect(() => {
    if (isSignedIn) {
      router.push(buildRedirectUrl());
    }
  }, [isSignedIn]);

  if (isSignedIn) return null;

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
      <SignIn fallbackRedirectUrl={buildRedirectUrl()} />
    </div>
  );
}
