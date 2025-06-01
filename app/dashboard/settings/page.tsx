'use client';

import { useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

import GeneralSettings from '@/components/dashboard/settings/GeneralSettings';
import ProfileSettings from '@/components/dashboard/settings/ProfileSettings';
import AccountSettings from '@/components/dashboard/settings/AccountSettings';
import AiSettings from '@/components/dashboard/settings/AiSettings';
import ConnectionsSettings from '@/components/dashboard/settings/ConnectionsSettings';
import NotificationsSettings from '@/components/dashboard/settings/NotificationsSettings';
import SecuritySettings from '@/components/dashboard/settings/SecuritySettings';
import BillingSettings from '@/components/dashboard/settings/BillingSettings';

const sections = [
  { key: 'general', label: 'General' },
  { key: 'profile', label: 'Profile' },
  { key: 'account', label: 'Account' },
  { key: 'ai', label: 'AI & Automation' },
  { key: 'connections', label: 'Connections' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'security', label: 'Security' },
  { key: 'billing', label: 'Billing' },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const { darkMode } = useDarkMode();

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings />;
      case 'profile':
        return <ProfileSettings />;
      case 'account':
        return <AccountSettings />;
      case 'ai':
        return <AiSettings />;
      case 'connections':
        return <ConnectionsSettings />;
      case 'notifications':
        return <NotificationsSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'billing':
        return <BillingSettings />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        padding: '2rem',
        minHeight: '100vh',
        backgroundColor: darkMode ? '#121212' : '#f9f9f9',
        color: darkMode ? '#f4f4f5' : '#111',
        fontFamily: `'Inter', 'Segoe UI', sans-serif`,
        transition: 'background 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '220px',
          borderRight: `1px solid ${darkMode ? '#333' : '#ddd'}`,
          paddingRight: '1.5rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            marginBottom: '2rem',
            color: darkMode ? '#fff' : '#111',
          }}
        >
          Settings
        </h2>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {sections.map((section) => (
            <li key={section.key}>
              <button
                onClick={() => setActiveSection(section.key)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: activeSection === section.key ? 600 : 400,
                  color:
                    activeSection === section.key
                      ? (darkMode ? '#fff' : '#000')
                      : (darkMode ? '#aaa' : '#666'),
                  cursor: 'pointer',
                  padding: '0.35rem 0',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'color 0.2s ease',
                }}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          paddingLeft: '2.5rem',
          paddingTop: '0.5rem',
          paddingBottom: '2rem',
          transition: 'color 0.3s ease',
        }}
      >
        {renderSection()}
      </main>
    </div>
  );
}
