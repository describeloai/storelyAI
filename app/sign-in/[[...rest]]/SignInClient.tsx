'use client';

import { SignIn } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';

export default function SignInClient() {
  const searchParams = useSearchParams();
  const redirectParam =
    searchParams.get('redirect_url') ?? '/dashboard';

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
      <SignIn redirectUrl={redirectParam} />
    </div>
  );
}
