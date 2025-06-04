// app/dashboard/settings/[slug]/ClientSettingsPage.tsx
'use client'; // ¡IMPORTANTE! Este sí lleva 'use client' porque usa hooks.

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Ya NO necesitamos useParams aquí.
import Link from 'next/link';

// Importa todos los iconos de Lucide React que corresponden a tus secciones de configuración.
import {
  User, LifeBuoy, Bell, Shield, HardDrive, Plug, Brain, Settings as SettingsIcon
} from 'lucide-react';

// Importa tus componentes específicos de configuración desde la carpeta 'components/dashboard/settings'.
// ¡VERIFICA DOBLEMENTE ESTAS RUTAS! Son cruciales.
import AccountSettings from '@/components/dashboard/settings/AccountSettings';
import AiSettings from '@/components/dashboard/settings/AiSettings';
import BillingSettings from '@/components/dashboard/settings/BillingSettings';
import ConnectionsSettings from '@/components/dashboard/settings/ConnectionsSettings';
import GeneralSettings from '@/components/dashboard/settings/GeneralSettings';
import HelpAndSupport from '@/components/dashboard/settings/HelpAndSupport';
import NotificationsSettings from '@/components/dashboard/settings/NotificationsSettings';
import SecuritySettings from '@/components/dashboard/settings/SecuritySettings';

// Importa tus contextos de aplicación
import { useDarkMode } from '@/context/DarkModeContext';
import { useLanguage } from '@/context/LanguageContext';

// Definición de las secciones de configuración para la barra lateral
const settingsNavItems = [
  { icon: <SettingsIcon size={20} />, path: 'general', labelKey: 'settings.general' },
  { icon: <User size={20} />, path: 'account', labelKey: 'settings.account' },
  { icon: <Brain size={20} />, path: 'ai', labelKey: 'settings.aiAutomation' },
  { icon: <Bell size={20} />, path: 'notifications', labelKey: 'settings.notifications' },
  { icon: <Shield size={20} />, path: 'security', labelKey: 'settings.security' },
  { icon: <HardDrive size={20} />, path: 'billing', labelKey: 'settings.billing' },
  { icon: <Plug size={20} />, path: 'connections', labelKey: 'settings.connections' },
  { icon: <LifeBuoy size={20} />, path: 'help', labelKey: 'settings.helpAndSupport' },
];

// Este Client Component ahora recibe el slug como una prop normal.
export default function ClientSettingsPage({ initialSlug }: { initialSlug: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { darkMode } = useDarkMode();
  const { t } = useLanguage();

  // Ahora activeSection se inicializa con la prop.
  // Podrías usar useState para manejar el cambio si la navegación interna de la sidebar cambiara el slug,
  // pero para rutas dinámicas, el slug ya viene en la prop.
  const activeSection = initialSlug;


  // Lógica de redirección para la ruta base /dashboard/settings/ (si tienes un page.tsx allí)
  useEffect(() => {
    const defaultPath = `/dashboard/settings/${settingsNavItems[0]?.path || 'general'}`;
    if (pathname === '/dashboard/settings' || pathname === '/dashboard/settings/') {
      router.replace(defaultPath);
    }
  }, [pathname, router]);


  // Función para renderizar el componente de la sección activa
  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings />;
      case 'account':
        return <AccountSettings />;
      case 'ai':
        return <AiSettings />;
      case 'notifications':
        return <NotificationsSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'billing':
        return <BillingSettings />;
      case 'connections':
        return <ConnectionsSettings />;
      case 'help':
        return <HelpAndSupport />;
      default:
        // Mensaje de fallback si el slug en la URL no coincide con ninguna sección conocida.
        return (
          <div style={{ padding: '2rem', textAlign: 'center', color: darkMode ? '#ccc' : '#555' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('settings.sectionNotFoundTitle')}</h3>
            <p>{t('settings.sectionNotFoundDescription')}</p>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', minHeight: '100%' }}>
      {/* Sidebar de Ajustes */}
      <aside
        style={{
          minWidth: '200px', padding: '1.5rem',
          backgroundColor: darkMode ? '#1a1a1a' : '#fff',
          borderRadius: '12px', boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
          display: 'flex', flexDirection: 'column', gap: '1rem',
          height: 'fit-content', position: 'sticky', top: '2rem', alignSelf: 'flex-start',
        }}
      >
        <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: darkMode ? '#f4f4f5' : '#111' }}>
          {t('settings.title')}
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {settingsNavItems.map((item) => (
            <Link
              key={item.path}
              href={`/dashboard/settings/${item.path}`}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1rem', borderRadius: '8px',
                backgroundColor:
                  activeSection === item.path
                    ? (darkMode ? '#333' : '#e0e7ff') : 'transparent',
                color:
                  activeSection === item.path
                    ? (darkMode ? '#fff' : '#4f46e5') : (darkMode ? '#ccc' : '#555'),
                fontWeight: activeSection === item.path ? '600' : 'normal',
                transition: 'background 0.2s ease, color 0.2s ease',
                textDecoration: 'none',
              }}
            >
              {item.icon}
              <span>{t(item.labelKey)}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Área de Contenido Principal */}
      <div style={{ flex: 1 }}>
        {renderSection()}
      </div>
    </div>
  );
}