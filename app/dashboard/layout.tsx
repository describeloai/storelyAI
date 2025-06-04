'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Home, Brain, Settings, Plug, Moon, Sun } from 'lucide-react';
import { useDarkMode } from '@/context/DarkModeContext';
import { useLanguage } from '@/context/LanguageContext';

// Definición de los elementos de navegación con sus claves de traducción
const navItems = [
  { icon: <Home size={20} />, path: '/dashboard', color: 'blue', labelKey: 'dashboard.homeLink' },
  { icon: <Brain size={20} />, path: '/dashboard/ia', color: 'pink', labelKey: 'dashboard.aiLink' },
  { icon: <Plug size={20} />, path: '/dashboard/integraciones', color: 'orange', labelKey: 'dashboard.integrationsLink' },
];

const colorCycle = ['#1DA1F2', '#F6E27F', '#228B22', '#FF784F', '#9B59B6', '#FF6F61'];

// COMPONENTE PRINCIPAL (Tu DashboardLayoutWrapper, que es tu app/dashboard/layout.tsx)
// Ya no contendrá DarkModeProvider ni LanguageProvider aquí, vienen del Root Layout
export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>{children}</DashboardLayout>
  );
}

// LAYOUT INTERNO (Este componente usa directamente los hooks de contexto)
function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { t } = useLanguage();

  const [activeColor, setActiveColor] = useState('gray');
  const [sColor, setSColor] = useState(0);

  useEffect(() => {
    // Cambiar clase body para dark mode
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSColor((prev) => (prev + 1) % colorCycle.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const current = navItems.find((item) => {
      return item.path === '/dashboard'
        ? pathname === '/dashboard'
        : pathname.startsWith(item.path);
    });
    setActiveColor(current?.color || 'gray');
  }, [pathname]);

  // ELIMINADO: El useEffect que forzaba document.body.style.overflow = 'hidden';
  // Esto permitía el scroll en la ventana completa si el contenido lo requería.
  // Ahora el scroll se gestiona a nivel del <main> si su contenido desborda.

  return (
    <div style={{ display: 'flex', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '80px',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: darkMode ? '#1a1a1a' : '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 0',
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.03)',
          zIndex: 50,
          transition: 'background 0.3s ease',
        }}
      >
        <div
          style={{
            fontWeight: 900,
            fontSize: '2.5rem',
            fontFamily: 'Segoe UI, Inter, sans-serif',
            background: 'linear-gradient(135deg, #6b5b95, #f06292)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 1px 3px rgba(0,0,0,0.2)',
            marginBottom: '2rem',
            transition: 'all 0.5s ease-in-out',
          }}
        >
          S
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {navItems.map((item) => {
            const isActive =
              item.path === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.path);

            const iconColor =
              item.path === '/dashboard/ia' && (isActive || pathname === '/dashboard/ia')
                ? '#FF6EC7'
                : isActive
                ? `var(--${item.color})`
                : darkMode
                ? '#ccc'
                : '#888';

            return (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  color: iconColor,
                  transition: 'color 0.3s ease',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '40px',
                }}
                title={item.labelKey ? t(item.labelKey) : undefined}
                aria-label={item.labelKey ? t(item.labelKey) : undefined}
              >
                {item.icon}
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            marginBottom: '4rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: darkMode ? '#f4f4f5' : '#333',
            }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link
            href="/dashboard/settings"
            style={{
              color: pathname === '/dashboard/settings' ? 'var(--gray)' : darkMode ? '#ccc' : '#888',
              transition: 'color 0.2s ease-in-out',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '40px',
            }}
            title={t('dashboard.settingsTitle')}
            aria-label={t('dashboard.settingsTitle')}
          >
            <Settings size={20} />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main
        style={{
          marginLeft: '80px',
          flex: 1,
          padding: '2rem',
          paddingBottom: '4rem', // Añadido para espacio al final del scroll
          minHeight: '100vh',
          position: 'relative',
          overflowX: 'hidden',
          overflowY: 'auto', // ¡LA CLAVE! Permite el scroll vertical en esta área
          backgroundColor: darkMode ? '#121212' : '#f1f3f5',
          color: darkMode ? '#f4f4f5' : '#111',
          borderTopLeftRadius: '1rem',
          borderTopRightRadius: '1rem',
          transition: 'background 0.3s ease, color 0.3s ease',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '220px',
            background: darkMode
              ? 'linear-gradient(to bottom, #000000, #222 70%, #121212 100%)'
              : 'linear-gradient(to bottom, #2C3E50, #E0E0E0 70%, #ffffff 100%)',
            opacity: 0.2,
            zIndex: 0,
            pointerEvents: 'none',
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem',
            transition: 'background 0.3s ease',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1280px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}