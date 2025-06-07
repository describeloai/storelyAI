'use client';
import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import EntryPointRouter from './EntryPointRouter';

const Landing = dynamic(() => import('./landing/LandingLayout'), { ssr: false }) as React.ComponentType;

export default function EntryPointPage() {
  const [showLanding, setShowLanding] = useState(true);
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URLSearchParams(window.location.search);
      setIsEmbedded(url.get('embedded') === '1' || window.top !== window.self);
    }
  }, []);

  return (
    <>
      <Suspense fallback={<p>Redirigiendo...</p>}>
        <EntryPointRouter onRedirect={() => setShowLanding(false)} />
      </Suspense>

      {!isEmbedded && showLanding && <Landing />}
    </>
  );
}
