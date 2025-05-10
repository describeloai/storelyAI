'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

// ✅ Interfaz para los datos privados guardados en Clerk
interface ShopifyMetadata {
  shop?: string;
  accessToken?: string;
}

export function useShopifyConnectionStatus() {
  const { user, isLoaded } = useUser();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [shopDomain, setShopDomain] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
      //@ts-ignore
    const metadata = user?.privateMetadata as ShopifyMetadata | undefined;

    const shop = metadata?.shop;
    const token = metadata?.accessToken;

    const connected = !!shop && !!token;
    setIsConnected(connected);
    setShopDomain(shop ?? null);
  }, [user, isLoaded]);

  return {
    isConnected,
    shopDomain,
    isLoaded,
  };
}
