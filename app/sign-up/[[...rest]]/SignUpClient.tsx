'use client';

import { SignUp } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpClient() {
  const { isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const fallbackRedirect = searchParams.get('redirect_url') || '/dashboard';

  useEffect(() => {
    if (isSignedIn) {
      router.push(fallbackRedirect);
    }
  }, [isSignedIn, fallbackRedirect, router]);

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
      <SignUp fallbackRedirectUrl={fallbackRedirect} />
    </div>
  );
}
