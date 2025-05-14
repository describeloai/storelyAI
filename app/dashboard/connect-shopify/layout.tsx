'use client';

import AppBridgeProvider from '@/components/dashboard/AppBridgeProvider';

export default function ConnectShopifyLayout({ children }: { children: React.ReactNode }) {
  return <AppBridgeProvider>{children}</AppBridgeProvider>;
}
