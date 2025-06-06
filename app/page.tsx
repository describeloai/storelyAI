'use client';
import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import EntryPointRouter from './EntryPointRouter';

const Landing = dynamic(() => import('./landing/LandingLayout'), {
  ssr: false,
}) as React.ComponentType;

export default function EntryPointPage() {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <>
      <Suspense fallback={<p>Redirigiendo...</p>}>
        <EntryPointRouter onRedirect={() => setShowLanding(false)} />
      </Suspense>

      {showLanding && <Landing />}
    </>
  );
}
