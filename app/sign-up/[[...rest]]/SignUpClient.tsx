'use client';

import { SignUp } from '@clerk/nextjs';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SignUpClient() {
  const { isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  const redirectUrl = searchParams.get('redirect_url') || '/dashboard';
  const host = searchParams.get('host');
  const shop = searchParams.get('shop');
  const embedded = searchParams.get('embedded');

  const buildRedirectUrl = () => {
    const params = new URLSearchParams();

    if (host) params.set('host', host);
    if (shop) params.set('shop', shop);
    if (embedded) params.set('embedded', embedded);

    return `${redirectUrl}${redirectUrl.includes('?') ? '&' : '?'}${params.toString()}`;
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
      <SignUp fallbackRedirectUrl={buildRedirectUrl()} />
    </div>
  );
}
