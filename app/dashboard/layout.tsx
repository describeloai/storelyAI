'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import FeatherIcon from '@/components/FeatherIcon';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile); // oculta sidebar si es móvil
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar superior más fino */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#111827',
          borderBottom: '1px solid #1F2937',
          padding: '0.5rem 1.5rem',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '48px',
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'white',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <FeatherIcon size={24} color="white" />
          <span>Storely</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, marginTop: '48px', position: 'relative' }}>
        {/* Overlay móvil */}
        {isMobile && isSidebarOpen && (
          <div
            onClick={toggleSidebar}
            style={{
              position: 'fixed',
              top: 48,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 50,
            }}
          />
        )}

        {/* Sidebar */}
        <div
          style={{
            position: isMobile ? 'fixed' : 'relative',
            top: isMobile ? 48 : undefined,
            left: 0,
            zIndex: 60,
            height: '100%',
          }}
        >
          <Sidebar isSidebarOpen={isSidebarOpen} onClose={closeSidebar} />
        </div>

        {/* Contenido */}
        <main
          style={{
            flexGrow: 1,
            padding: '2rem',
            backgroundColor: '#f4f4f5',
            color: '#111827',
            minHeight: 'calc(100vh - 48px)',
            width: '100%',
          }}
        >
          {isMobile && (
            <button
              onClick={toggleSidebar}
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
  );
}
