'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const redirectParam =
    typeof searchParams?.redirect_url === 'string'
      ? searchParams.redirect_url
      : '/dashboard';

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
