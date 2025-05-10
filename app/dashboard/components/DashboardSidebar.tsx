'use client';

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
  Link,
  PlugZap,
} from 'lucide-react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';

interface SidebarProps {
  isSidebarOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isSidebarOpen, onClose }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname() ?? '';
  const { user, isLoaded } = useUser();
// @ts-ignore
  const shop = isLoaded ? (user?.privateMetadata?.shop as string | undefined) : undefined;
  // @ts-ignore
  const token = isLoaded ? (user?.privateMetadata?.accessToken as string | undefined) : undefined;
  const isShopifyConnected = !!(shop && token);

  // Debug en consola
  useEffect(() => {
    console.log("🧪 isLoaded:", isLoaded);
    // @ts-ignore
    console.log("🧪 USER METADATA:", user?.privateMetadata);
  }, [isLoaded, user]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
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

    // Mostrar "Conectar Shopify" solo si NO está conectada
    ...(!isShopifyConnected
      ? [{
          href: '/dashboard/connect-shopify',
          label: 'Conectar Shopify',
          icon: Link,
          custom: true,
        }]
      : []),

    // Mostrar "Integraciones" SIEMPRE
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
        {links.map(({ href, label, icon: Icon, custom }) => (
          <div
            key={href}
            onClick={() => handleClick(href)}
            style={{
              ...getLinkStyle(pathname === href),
              ...(custom && {
                backgroundColor: '#30C75D',
                color: '#ffffff',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }),
            }}
          >
            {href === '/dashboard/connect-shopify' ? (
              <Image
                src="/logos/shopify.png"
                alt="Shopify"
                width={16}
                height={16}
                style={{ borderRadius: 2 }}
              />
            ) : (
              <Icon size={16} />
            )}
            <span>{label}</span>
          </div>
        ))}
      </nav>

      {/* Mostrar tienda si está conectada */}
      {isShopifyConnected && shop && (
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
          {shop}
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
