'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import FeatherIcon from '@/components/FeatherIcon'; // ✅ Pluma SVG como componente

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar superior */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#111827',
          borderBottom: '1px solid #1F2937',
          padding: '1rem 2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
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
          <FeatherIcon size={28} color="white" /> {/* ✅ Pluma aumentada */}
          <span style={{ color: 'white' }}>Storely</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Contenedor principal con sidebar + contenido */}
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <main
          style={{
            flexGrow: 1,
            padding: '2rem',
            transition: 'margin-left 0.3s ease',
            backgroundColor: '#f4f4f5',
            color: '#111827',
            minHeight: 'calc(100vh - 64px)',
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
                display: 'inline-block',
              }}
            >
              ☰
            </button>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}
