'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function EntryPoint() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [skippingLanding, setSkippingLanding] = useState(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const url = new URL(window.location.href);
    const embedded = url.searchParams.get('embedded');
    const host = url.searchParams.get('host');

    if (embedded && host) {
      setSkippingLanding(true);
      router.replace('/dashboard');
    }
  }, [isLoaded, isSignedIn]);

  if (skippingLanding) {
    return (
      <div style={{ color: 'white', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Cargando Storely...
      </div>
    );
  }

  const Landing = require('./LandingPage').default;
  return <Landing />;
}
