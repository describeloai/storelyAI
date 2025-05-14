'use client';

import AppBridgeProvider from '@/components/dashboard/AppBridgeProvider';

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return <AppBridgeProvider>{children}</AppBridgeProvider>;
}
