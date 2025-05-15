'use client';

import { SignUp } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect_url') || '/dashboard';

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
      <SignUp redirectUrl={redirectParam} />
    </div>
  );
}
