import { SignUp } from '@clerk/nextjs';

interface SignUpPageProps {
  searchParams: { redirect_url?: string };
}

export default function SignUpPage({ searchParams }: SignUpPageProps) {
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
      <SignUp redirectUrl={redirectParam} />
    </div>
  );
}
