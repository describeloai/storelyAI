'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarProps {
  isSidebarOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isSidebarOpen, onClose }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cierra el sidebar después de redirigir
  const handleClick = (href: string) => {
    router.push(href);
    if (isMobile) {
      onClose();
    }
  };

  if (!isSidebarOpen) return null;

  return (
    <aside
      style={{
        width: '250px',
        backgroundColor: '#F3F4F6',
        padding: '2rem 1.5rem',
        height: '100vh',
        borderRight: '1px solid #E5E7EB',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p
          style={{
            fontSize: '0.75rem',
            color: '#6B7280',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}
        >
          Panel Principal
        </p>

        <SidebarLink href="/dashboard/products" pathname={pathname} onClick={handleClick}>
          Buscar Productos
        </SidebarLink>
        <SidebarLink href="/dashboard/descriptions" pathname={pathname} onClick={handleClick}>
          Generador de Descripciones
        </SidebarLink>
        <SidebarLink href="/dashboard/tools" pathname={pathname} onClick={handleClick}>
          Kit de Herramientas
        </SidebarLink>
        <SidebarLink href="/dashboard/product-check" pathname={pathname} onClick={handleClick}>
          ¿Ya se vende esto?
        </SidebarLink>
        <SidebarLink href="/dashboard/page-generator" pathname={pathname} onClick={handleClick}>
          Generador de Páginas
        </SidebarLink>
        <SidebarLink href="/dashboard/tracker" pathname={pathname} onClick={handleClick}>
          Tracker Avanzado
        </SidebarLink>
        <SidebarLink href="/dashboard/chatbot" pathname={pathname} onClick={handleClick}>
          Chatbot Inteligente
        </SidebarLink>
        <SidebarLink href="/dashboard/social-copies" pathname={pathname} onClick={handleClick}>
          Copys para Redes Sociales
        </SidebarLink>

        <p
          style={{
            fontSize: '0.75rem',
            color: '#6B7280',
            textTransform: 'uppercase',
            margin: '2rem 0 0.5rem',
          }}
        >
          Gestión
        </p>

        <SidebarLink href="/dashboard/analytics" pathname={pathname} onClick={handleClick}>
          Análisis de Ventas
        </SidebarLink>
        <SidebarLink href="/dashboard/account" pathname={pathname} onClick={handleClick}>
          Mi Cuenta
        </SidebarLink>
        <SidebarLink href="/dashboard/plans" pathname={pathname} onClick={handleClick}>
          Planes
        </SidebarLink>
      </nav>
    </aside>
  );
}

function SidebarLink({
  href,
  children,
  pathname,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  pathname: string;
  onClick: (href: string) => void;
}) {
  const isActive = pathname === href;

  return (
    <div
      onClick={() => onClick(href)}
      style={{
        color: isActive ? '#4F46E5' : '#111827',
        backgroundColor: isActive ? '#E0E7FF' : 'transparent',
        fontWeight: 500,
        fontSize: '0.95rem',
        textDecoration: 'none',
        padding: '0.25rem 0.5rem',
        borderRadius: '0.375rem',
        transition: 'background 0.2s',
        cursor: 'pointer',
      }}
    >
      {children}
    </div>
  );
}
