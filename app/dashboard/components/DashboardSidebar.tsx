'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Settings,
  Home,
  Search,
  FileText,
  Box,
  ScanLine,
  Layout,
  BarChart,
  MessageCircle,
  MessageSquareText,
} from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({ isSidebarOpen, onClose }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (href: string) => {
    router.push(href);
    if (isMobile) onClose();
  };

  if (!isSidebarOpen) return null;

  return (
    <aside
      style={{
        width: '220px',
        backgroundColor: '#F3F4F6',
        padding: '1.5rem 1.2rem 1rem',
        height: 'calc(100vh - 44px)',
        position: 'fixed',
        top: '44px',
        left: 0,
        borderRight: '1px solid #E5E7EB',
        borderTopRightRadius: '1rem',
        borderBottomRightRadius: '1rem',
        boxSizing: 'border-box',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: '1.5rem',
        zIndex: 60,
      }}
    >
      {/* Configuración arriba */}
      <SidebarLink href="/dashboard/settings" pathname={pathname} onClick={handleClick}>
        <Settings size={16} />
        <span>Configuración</span>
      </SidebarLink>

      {/* Navegación principal */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <SidebarLink href="/dashboard" pathname={pathname} onClick={handleClick}>
          <Home size={16} />
          <span>Inicio</span>
        </SidebarLink>
        <SidebarLink href="/dashboard/products" pathname={pathname} onClick={handleClick}>
          <Search size={16} />
          <span>Buscar Productos</span>
        </SidebarLink>
        <SidebarLink href="/dashboard/descriptions" pathname={pathname} onClick={handleClick}>
          <FileText size={16} />
          <span>Generador de Descripciones</span>
        </SidebarLink>
        <SidebarLink href="/dashboard/tools" pathname={pathname} onClick={handleClick}>
          <Box size={16} />
          <span>Kit de Herramientas</span>
        </SidebarLink>
        <SidebarLink href="/dashboard/product-check" pathname={pathname} onClick={handleClick}>
          <ScanLine size={16} />
          <span>¿Ya se vende esto?</span>
        </SidebarLink>
        <SidebarLink href="/dashboard/page-generator" pathname={pathname} onClick={handleClick}>
          <Layout size={16} />
          <span>Generador de Páginas</span>
        </SidebarLink>
        <SidebarLink href="/dashboard/tracker" pathname={pathname} onClick={handleClick}>
          <BarChart size={16} />
          <span>Tracker Avanzado</span>
        </SidebarLink>
        <SidebarLink href="/dashboard/chatbot" pathname={pathname} onClick={handleClick}>
          <MessageCircle size={16} />
          <span>Chatbot Inteligente</span>
        </SidebarLink>
        <SidebarLink href="/dashboard/social-copies" pathname={pathname} onClick={handleClick}>
          <MessageSquareText size={16} />
          <span>Copys para Redes Sociales</span>
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
        fontSize: '0.9rem',
        padding: '0.45rem 0.6rem',
        borderRadius: '0.5rem',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      {children}
    </div>
  );
}
