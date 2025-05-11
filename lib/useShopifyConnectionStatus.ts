'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export function useShopifyConnectionStatus() {
  const { user, isLoaded } = useUser();
  const [isConnected, setIsConnected] = useState(false);
  const [shopDomain, setShopDomain] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    // @ts-ignore
    const shop = user?.privateMetadata?.shop as string | undefined;
    // @ts-ignore
    const token = user?.privateMetadata?.accessToken as string | undefined;

    const connected = !!shop && !!token;
    setIsConnected(connected);
    setShopDomain(shop ?? null);
  }, [user]);

  return {
    isConnected,
    shopDomain,
    isLoaded,
  };
}
