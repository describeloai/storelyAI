'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useDarkMode } from '@/context/DarkModeContext';
import styles from '@/components/dashboard/ui/ConnectionsSettings.module.css'; // Adjust path if needed

// Define an interface for your integration objects for better type safety
interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  lastSuccessfulConnection: string | null;
  lastError: string | null;
}

// Dummy data for integrations. In a real app, this would come from an API.
const initialIntegrations: Integration[] = [
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Connect your Shopify store to sync product data, orders, and customer information for AI analysis and automation.',
    logo: '/logos/shopify-white.png', // Assuming white logo works for both modes or you handle dynamic loading
    status: 'connected', // 'connected', 'disconnected', 'error', 'pending'
    lastSuccessfulConnection: '2025-06-04T10:30:00Z',
    lastError: null,
  },
  {
    id: 'linkedin',
    name: 'Linkedin',
    description: 'Impulsa tu presencia en LinkedIn: publica con IA, automatiza mensajes y genera más oportunidades de negocio de forma inteligente.',
    logo: '/logos/linkedin.png', // Assuming white logo works for both modes or you handle dynamic loading
    status: 'pending',
    lastSuccessfulConnection: null,
    lastError: null,
  },
  {
    id: 'amazon',
    name: 'Amazon Seller Central',
    description: 'Sync your Amazon sales data to optimize listings, manage inventory, and track performance.',
    logo: '/logos/amazon.png',
    status: 'disconnected',
    lastSuccessfulConnection: '2025-05-20T14:00:00Z',
    lastError: null,
  },
  {
    id: 'facebook',
    name: 'Facebook Ads',
    description: 'Connect your Facebook Ads account to analyze campaign performance and automate ad management.',
    logo: '/logos/facebook.png',
    status: 'connected',
    lastSuccessfulConnection: '2025-06-03T09:15:00Z',
    lastError: null,
  },
  {
    id: 'instagram',
    name: 'Instagram Business',
    description: 'Manage your Instagram presence, schedule posts, and analyze engagement.',
    logo: '/logos/instagram.png',
    status: 'error',
    lastSuccessfulConnection: '2025-06-01T11:00:00Z',
    lastError: 'Invalid API Key',
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Integrate Gmail for automated email responses, customer service insights, and communication tracking.',
    logo: '/logos/gmail.png',
    status: 'connected',
    lastSuccessfulConnection: '2025-06-04T16:45:00Z',
    lastError: null,
  },
  {
    id: 'drive',
    name: 'Google Drive',
    description: 'Access and manage files in Google Drive for content creation and data storage.',
    logo: '/logos/drive.png',
    status: 'connected',
    lastSuccessfulConnection: '2025-06-02T13:00:00Z',
    lastError: null,
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Connect Notion to streamline your workflows and manage documentation.',
    logo: '/logos/notion.png',
    status: 'disconnected',
    lastSuccessfulConnection: '2025-05-15T09:00:00Z',
    lastError: null,
  },
];

export default function ConnectionsSettings() {
  const { darkMode } = useDarkMode();
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  // Type selectedIntegration as Integration | null
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  // Helper function to get status CSS class
  const getStatusClass = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return styles.connected;
      case 'disconnected':
        return styles.disconnected;
      case 'error':
      case 'pending': // Both 'error' and 'pending' use the 'attention' style
        return styles.attention;
      default:
        return '';
    }
  };

  // Helper function to get status text
  const getStatusText = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'disconnected':
        return 'Disconnected';
      case 'error':
        return 'Error';
      case 'pending':
        return 'Pending Setup';
      default:
        return '';
    }
  };

  // Handler for disconnecting an integration
  const handleDisconnect = (id: string) => {
    if (window.confirm('Are you sure you want to disconnect this integration?')) {
      setIntegrations(integrations.map(integration =>
        integration.id === id ? { ...integration, status: 'disconnected', lastError: null } : integration
      ));
      setSelectedIntegration(null); // Close detailed view after disconnection
    }
  };

  // Handler for reconnecting an integration
  const handleReconnect = (id: string) => {
    // In a real application, this would trigger an API call to re-authenticate or refresh tokens
    setIntegrations(integrations.map(integration =>
      integration.id === id ? { ...integration, status: 'connected', lastSuccessfulConnection: new Date().toISOString(), lastError: null } : integration
    ));
    setSelectedIntegration(null); // Close detailed view after reconnection
  };

  // Handler for testing connection
  const handleTestConnection = (id: string) => {
    // Simulate a test connection. In a real app, this would be an API call.
    alert(`Testing connection for ${integrations.find(int => int.id === id)?.name}... (Simulated Success!)`);
  };

  // Helper function to format date
  const formatDate = (isoString: string | null) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}>
      <h1 className={`${styles.title} ${darkMode ? styles.dark : styles.light}`}>Connections</h1>
      <p className={`${styles.description} ${darkMode ? styles.dark : styles.light}`}>Manage preferences and tokens for your active integrations. For full integration management, visit the dedicated Integrations section.</p>

      <hr className={styles.horizontalRule} />

      {/* Conditional rendering based on whether an integration is selected */}
      {!selectedIntegration ? (
        // Grid view for all integrations
        <div className={`${styles.section} ${darkMode ? styles.dark : styles.light}`}>
          <h2 className={`${styles.subTitle} ${darkMode ? styles.dark : styles.light}`}>Your Activated Integrations</h2>
          <div className={styles.connectionsGrid}>
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className={`${styles.connectionCard} ${darkMode ? styles.dark : styles.light}`}
                onClick={() => setSelectedIntegration(integration)} // This updates selectedIntegration
              >
                <div className={styles.connectionHeader}>
                  <Image
                    src={integration.logo}
                    alt={`${integration.name} Logo`}
                    width={48}
                    height={48}
                    className={styles.connectionLogo}
                  />
                  <span className={styles.appName}>{integration.name}</span>
                </div>
                <div className={styles.connectionStatus}>
                  <span className={`${styles.statusIndicator} ${getStatusClass(integration.status)}`}></span>
                  <span className={`${styles.statusText} ${getStatusClass(integration.status)}`}>{getStatusText(integration.status)}</span>
                </div>
                <p className={`${styles.connectionMeta} ${darkMode ? styles.dark : styles.light}`}>
                  {integration.description.length > 90 ? integration.description.substring(0, 90) + '...' : integration.description}
                </p>
                <div className={`${styles.lastActivity} ${darkMode ? styles.dark : styles.light}`}>
                  <span>Last Connected:</span> {formatDate(integration.lastSuccessfulConnection)}
                  {integration.lastError && (
                    <div style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                      <span>Last Error:</span> {integration.lastError}
                    </div>
                  )}
                </div>
                <div className={`${styles.cardActions} ${darkMode ? styles.dark : styles.light}`}>
                  {integration.status === 'connected' && (
                    <>
                      <button
                        className={`${styles.button} ${styles.danger}`}
                        onClick={(e) => { e.stopPropagation(); handleDisconnect(integration.id); }}
                      >
                        Disconnect
                      </button>
                      <button
                        className={`${styles.button} ${styles.secondary}`}
                        onClick={(e) => { e.stopPropagation(); handleTestConnection(integration.id); }}
                      >
                        Test
                      </button>
                    </>
                  )}
                  {(integration.status === 'disconnected' || integration.status === 'error' || integration.status === 'pending') && (
                    <button
                      className={`${styles.button} ${styles.primary}`}
                      onClick={(e) => { e.stopPropagation(); handleReconnect(integration.id); }}
                    >
                      {integration.status === 'pending' ? 'Complete Setup' : 'Reconnect'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Detailed view for a single selected integration
        // Add conditional rendering or optional chaining here to ensure selectedIntegration is not null
        selectedIntegration && (
          <div className={`${styles.section} ${darkMode ? styles.dark : styles.light}`}>
            <button className={`${styles.button} ${styles.secondary}`} onClick={() => setSelectedIntegration(null)} style={{ marginBottom: '1.5rem' }}>
              ← Back to Connections
            </button>
            <div className={styles.connectionHeader}>
              <Image
                src={selectedIntegration.logo}
                alt={`${selectedIntegration.name} Logo`}
                width={64}
                height={64}
                className={styles.connectionLogo}
              />
              <h2 className={`${styles.subTitle} ${darkMode ? styles.dark : styles.light}`}>{selectedIntegration.name}</h2>
            </div>
            <p className={`${styles.description} ${darkMode ? styles.dark : styles.light}`}>{selectedIntegration.description}</p>

            <div className={styles.connectionStatus} style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              <span className={`${styles.statusIndicator} ${getStatusClass(selectedIntegration.status)}`}></span>
              <span className={`${styles.statusText} ${getStatusClass(selectedIntegration.status)}`}>Status: {getStatusText(selectedIntegration.status)}</span>
            </div>

            <div className={`${styles.connectionMeta} ${darkMode ? styles.dark : styles.light}`} style={{ marginBottom: '1.5rem' }}>
              <p><strong>Last Successful Connection:</strong> {formatDate(selectedIntegration.lastSuccessfulConnection)}</p>
              {selectedIntegration.lastError && (
                <p style={{ color: '#dc3545' }}><strong>Last Error:</strong> {selectedIntegration.lastError}</p>
              )}
            </div>

            <div className={`${styles.cardActions} ${darkMode ? styles.dark : styles.light}`} style={{ borderTop: 'none', paddingTop: '0' }}>
              {selectedIntegration.status === 'connected' && (
                <>
                  <button
                    className={`${styles.button} ${styles.danger}`}
                    onClick={() => handleDisconnect(selectedIntegration.id)}
                  >
                    Disconnect
                  </button>
                  <button
                    className={`${styles.button} ${styles.secondary}`}
                    onClick={() => handleTestConnection(selectedIntegration.id)}
                  >
                    Test Connection
                  </button>
                </>
              )}
              {(selectedIntegration.status === 'disconnected' || selectedIntegration.status === 'error' || selectedIntegration.status === 'pending') && (
                <button
                  className={`${styles.button} ${styles.primary}`}
                  onClick={() => handleReconnect(selectedIntegration.id)}
                >
                  {selectedIntegration.status === 'pending' ? 'Complete Setup' : 'Reconnect'}
                </button>
              )}
              <a href="/dashboard/integrations" className={`${styles.button} ${styles.secondary}`} style={{ textDecoration: 'none', textAlign: 'center' }}>
                Manage Integration
              </a>
            </div>
          </div>
        )
      )}
    </div>
  );
}