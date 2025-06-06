'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const Landing = dynamic(() => import('./landing/LandingLayout'), {
  ssr: false,
}) as React.ComponentType;

export default function EntryPoint() {
  const router = useRouter();
  const params = useSearchParams();
  const [shouldShowLanding, setShouldShowLanding] = useState(true);

  useEffect(() => {
    const shop = params.get('shop');
    const host = params.get('host');
    const isEmbedded = params.get('embedded');

    if (shop && host && isEmbedded === '1') {
      const url = `/dashboard?shop=${shop}&host=${host}&embedded=1`;
      router.replace(url);
      setShouldShowLanding(false);
    }
  }, [params, router]);

  if (!shouldShowLanding) return null;

  return <Landing />;
}
