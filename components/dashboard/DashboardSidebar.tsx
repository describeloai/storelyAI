'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
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
  PlugZap,
} from 'lucide-react';
import { useShopifyConnectionStatus } from '@/lib/useShopifyConnectionStatus';
import { navigateToEmbeddedRoute } from '@/utils/navigateToEmbeddedRoute';

interface SidebarProps {
  isSidebarOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isSidebarOpen, onClose }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname() ?? '';
  const { isConnected, shopDomain, isLoaded } = useShopifyConnectionStatus();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (href: string) => {
    navigateToEmbeddedRoute(href);
    if (isMobile) onClose();
  };

  if (!isSidebarOpen || !isLoaded) return null;

  const links = [
    { href: '/dashboard', label: 'Inicio', icon: Home },
    { href: '/dashboard/products', label: 'Buscar Productos', icon: Search },
    { href: '/dashboard/descriptions', label: 'Generador de Descripciones', icon: FileText },
    { href: '/dashboard/tools', label: 'Kit de Herramientas', icon: Box },
    { href: '/dashboard/product-check', label: '¿Ya se vende esto?', icon: ScanLine },
    { href: '/dashboard/page-generator', label: 'Generador de Páginas', icon: Layout },
    { href: '/dashboard/tracker', label: 'Tracker Avanzado', icon: BarChart },
    { href: '/dashboard/chatbot', label: 'Chatbot Inteligente', icon: MessageCircle },
    { href: '/dashboard/social-copies', label: 'Copys para Redes Sociales', icon: MessageSquareText },
    { href: '/dashboard/integrations', label: 'Integraciones', icon: PlugZap },
    { href: '/dashboard/settings', label: 'Configuración', icon: Settings },
  ];

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
        justifyContent: 'space-between',
        zIndex: 60,
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {links.map(({ href, label, icon: Icon }) => (
          <div
            key={href}
            onClick={() => handleClick(href)}
            style={getLinkStyle(pathname === href)}
          >
            <Icon size={16} />
            <span>{label}</span>
          </div>
        ))}
      </nav>

      {isConnected && shopDomain && (
        <div
          style={{
            marginTop: '2rem',
            fontSize: '0.8rem',
            color: '#555',
            textAlign: 'center',
            wordBreak: 'break-word',
          }}
        >
          <span style={{ fontWeight: 600 }}>Tienda conectada:</span>
          <br />
          {shopDomain}
        </div>
      )}
    </aside>
  );
}

function getLinkStyle(isActive: boolean) {
  return {
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
  };
}
