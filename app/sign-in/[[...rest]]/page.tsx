import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SignUpClient = dynamic(() => import('./SignInClient'), { ssr: false });

export default function SignUpPage() {
  return (
    <Suspense fallback={<div style={{ color: 'white' }}>Cargando registro...</div>}>
      <SignUpClient />
    </Suspense>
  );
}
