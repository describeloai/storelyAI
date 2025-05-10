'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export function useShopifyConnectionStatus() {
  const { user, isLoaded } = useUser(); // <--- ¡Incluido aquí!
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [shopDomain, setShopDomain] = useState<string | null>(null);

  useEffect(() => {
    // Clerk metadata
    // @ts-ignore
    const shop = user?.privateMetadata?.shop as string | undefined;
    // @ts-ignore
    const token = user?.privateMetadata?.accessToken as string | undefined;

    // Local fallback
    const localOverride =
      typeof window !== 'undefined' && localStorage.getItem('storelyShopifyConnected') === 'true';

    const connected = (!!shop && !!token) || localOverride;
    setIsConnected(connected);
    setShopDomain(shop ?? null);
  }, [user]);

  return {
    isConnected,
    shopDomain,
    isLoaded, // <--- ¡Agregado al return!
  };
}
