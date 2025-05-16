import { SignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface SignInPageProps {
  searchParams: { redirect_url?: string };
}

export default function SignInPage({ searchParams }: SignInPageProps) {
  const redirectParam = searchParams?.redirect_url || '/dashboard';

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
