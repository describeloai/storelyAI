'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';

import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import AppBridgeProvider from '@/components/dashboard/AppBridgeProvider';
import RouteProtector from '@/components/dashboard/RouteProtector';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const host = searchParams.get('host');
    const shop = searchParams.get('shop');

    // Shopify embebido debe tener host y shop. Si no, no renderizamos nada.
    if (!host || !shop) {
      console.warn('🛑 Falta host o shop en el layout embebido.');
      return;
    }

    // Esperamos a que Clerk esté listo
    if (isLoaded && isSignedIn) {
      setIsReady(true);
    }
  }, [isLoaded, isSignedIn, searchParams]);

  if (!isReady) return null;

  return (
    <AppBridgeProvider>
      <RouteProtector />

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <DashboardNavbar />

        <div style={{ display: 'flex', flex: 1, marginTop: '44px', position: 'relative' }}>
          {isMobile && isSidebarOpen && (
            <div
              onClick={() => setIsSidebarOpen(false)}
              style={{
                position: 'fixed',
                top: 44,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.3)',
                zIndex: 50,
              }}
            />
          )}

          <DashboardSidebar
            isSidebarOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          <main
            style={{
              flexGrow: 1,
              padding: '2rem',
              paddingLeft: '220px',
              backgroundColor: '#f4f4f5',
              color: '#111827',
              minHeight: 'calc(100vh - 44px)',
              width: '100%',
            }}
          >
            {isMobile && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                style={{
                  backgroundColor: '#9F7AEA',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 1.2rem',
                  borderRadius: '0.5rem',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  marginBottom: '2rem',
                }}
              >
                ☰ Menú
              </button>
            )}
            {children}
          </main>
        </div>
      </div>
    </AppBridgeProvider>
  );
}
