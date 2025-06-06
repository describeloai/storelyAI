'use client';
import { SignIn } from '@clerk/nextjs';
import { useIsEmbedded } from '@/hooks/useIsEmbedded';

export default function SignInPage() {
  const isEmbedded = useIsEmbedded();

  if (isEmbedded) return null;

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
      }}
    >
      <SignIn redirectUrl="/dashboard" />
    </div>
  );
}
