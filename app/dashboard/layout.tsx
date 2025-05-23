'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Home, BarChart2, Zap, BookOpen, Settings, Plug } from 'lucide-react';

const navItems = [
  { icon: <Home size={20} />, path: '/dashboard', color: 'blue' },
  { icon: <Zap size={20} />, path: '/dashboard/marketing', color: 'lavender' },
  { icon: <BarChart2 size={20} />, path: '/dashboard/analytics', color: 'green' },
  { icon: <BookOpen size={20} />, path: '/dashboard/operations', color: 'purple' },
  { icon: <Plug size={20} />, path: '/dashboard/integraciones', color: 'orange' },
];

const colorCycle = ['#1DA1F2', '#F6E27F', '#228B22', '#FF784F', '#9B59B6', '#FF6F61'];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeColor, setActiveColor] = useState('gray');
  const [sColor, setSColor] = useState(0);

  useEffect(() => {
    const current = navItems.find((item) => {
      return item.path === '/dashboard'
        ? pathname === '/dashboard'
        : pathname.startsWith(item.path);
    });
    setActiveColor(current?.color || 'gray');
  }, [pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSColor((prev) => (prev + 1) % colorCycle.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Sidebar fijo */}
      <aside
        style={{
          width: '80px',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 0',
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.03)',
          zIndex: 50,
        }}
      >
        {/* Logo animado S */}
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '2rem',
            color: colorCycle[sColor],
            marginBottom: '2rem',
            transition: 'color 0.5s ease-in-out',
          }}
        >
          S
        </div>

        {/* Íconos del sidebar */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {navItems.map((item) => {
            const isActive =
              item.path === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  color: isActive ? `var(--${item.color})` : '#888',
                  transition: 'color 0.2s ease-in-out',
                }}
              >
                {item.icon}
              </Link>
            );
          })}
        </nav>

        {/* Icono de Configuración más arriba */}
        <div style={{ marginBottom: '4rem' }}>
          <Link
            href="/dashboard/settings"
            style={{
              color: pathname === '/dashboard/settings' ? 'var(--gray)' : '#888',
              transition: 'color 0.2s ease-in-out',
            }}
          >
            <Settings size={20} />
          </Link>
        </div>
      </aside>

      {/* Contenido principal */}
      <main style={{ marginLeft: '80px', padding: '2rem', width: '100%' }}>{children}</main>
    </>
  );
}
