'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User, LifeBuoy, Bell, Shield, HardDrive, Plug, Brain, Settings as SettingsIcon
} from 'lucide-react';

import AccountSettings from '@/components/dashboard/settings/AccountSettings';
import AiSettings from '@/components/dashboard/settings/AiSettings';
import BillingSettings from '@/components/dashboard/settings/BillingSettings';
import ConnectionsSettings from '@/components/dashboard/settings/ConnectionsSettings';
import GeneralSettings from '@/components/dashboard/settings/GeneralSettings';
import HelpAndSupport from '@/components/dashboard/settings/HelpAndSupport';
import NotificationsSettings from '@/components/dashboard/settings/NotificationsSettings';
import SecuritySettings from '@/components/dashboard/settings/SecuritySettings';

import { useDarkMode } from '@/context/DarkModeContext';
import { useLanguage } from '@/context/LanguageContext';

// Lista fija de secciones
const settingsNavItems = [
  { icon: <SettingsIcon size={20} />, path: 'general', labelKey: 'General' },
  { icon: <User size={20} />, path: 'account', labelKey: 'Account' },
  { icon: <Brain size={20} />, path: 'ai', labelKey: 'AI-Automation' },
  { icon: <Bell size={20} />, path: 'notifications', labelKey: 'Notifications' },
  { icon: <Shield size={20} />, path: 'security', labelKey: 'Security' },
  { icon: <HardDrive size={20} />, path: 'billing', labelKey: 'Billing' },
  { icon: <Plug size={20} />, path: 'connections', labelKey: 'Connections' },
  { icon: <LifeBuoy size={20} />, path: 'help', labelKey: 'Help' },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const { darkMode } = useDarkMode();
  const { t } = useLanguage();
  const router = useRouter();

  const renderSection = () => {
    switch (activeSection) {
      case 'general': return <GeneralSettings />;
      case 'account': return <AccountSettings />;
      case 'ai': return <AiSettings />;
      case 'notifications': return <NotificationsSettings />;
      case 'security': return <SecuritySettings />;
      case 'billing': return <BillingSettings />;
      case 'connections': return <ConnectionsSettings />;
      case 'help': return <HelpAndSupport />;
      default:
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
      <aside
  style={{
    minWidth: '200px',
    padding: '1.5rem',
    backgroundColor: darkMode ? '#1a1a1a' : '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    height: '100vh',
    position: 'sticky',
    top: 0,
  }}
>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: darkMode ? '#f4f4f5' : '#111' }}>
          {t('Settings')}
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {settingsNavItems.map((item) => (
            <button
              key={item.path}
              onClick={() => setActiveSection(item.path)}
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
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              {item.icon}
              <span>{t(item.labelKey)}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div style={{ flex: 1 }}>
        {renderSection()}
      </div>
    </div>
  );
}
