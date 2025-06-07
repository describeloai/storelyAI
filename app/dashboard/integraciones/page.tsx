'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/integrations.module.css'; // Import the CSS module
import { useDarkMode } from '@/context/DarkModeContext'; // Import your DarkModeContext

// Define a type for integration data
interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string; // Path to the logo image
  isConnected: boolean;
  connectPath: string; // Backend API path for connection
}

export default function IntegracionesPage() {
  const { darkMode } = useDarkMode(); // Use the dark mode context
  const [shop, setShop] = useState(''); // State for Shopify connection input
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Sincroniza productos, pedidos y clientes para optimizar tu tienda y automatizar tareas con IA.',
      logo: '/logos/shopify-white.png',
      isConnected: false, // This should come from your backend state
      connectPath: '/api/shopify/auth',
    },
    {
      id: 'amazon-seller-central',
      name: 'Amazon Seller Central',
      description: 'Gestiona tu inventario, precios y listings con IA para mejorar tus ventas en Amazon.',
      logo: '/logos/amazon.png',
      isConnected: false, // This should come from your backend state
      connectPath: '/api/amazon/auth', // Placeholder
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Impulsa tu presencia en LinkedIn: publica con IA, automatiza mensajes y genera más oportunidades.',
      logo: '/logos/linkedin.png',
      isConnected: true, // Example: connected
      connectPath: '/api/linkedin/auth', // Placeholder
    },
    {
      id: 'facebook-ads',
      name: 'Facebook Ads',
      description: 'Conecta tu cuenta de Facebook Ads para analizar, optimizar y crear campañas publicitarias con IA.',
      logo: '/logos/facebook.png',
      isConnected: true, // Example: connected
      connectPath: '/api/facebookads/auth', // Placeholder
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Programa publicaciones, analiza métricas y gestiona interacciones con IA para crecer en Instagram.',
      logo: '/logos/instagram.png',
      isConnected: false,
      connectPath: '/api/instagram/auth', // Placeholder
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Automatiza la gestión de correos, clasifica mensajes y redacta respuestas con la ayuda de la IA.',
      logo: '/logos/gmail.png',
      isConnected: false,
      connectPath: '/api/gmail/auth', // Placeholder
    },
    {
      id: 'google-drive',
      name: 'Google Drive',
      description: 'Organiza tus archivos, genera documentos y encuentra información rápidamente con el poder de la IA.',
      logo: '/logos/drive.png',
      isConnected: false,
      connectPath: '/api/drive/auth', // Placeholder
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Estructura tu conocimiento, automatiza flujos de trabajo y crea contenido con la asistencia de la IA.',
      logo: '/logos/notion.png',
      isConnected: false,
      connectPath: '/api/notion/auth', // Placeholder
    },
    // Add more integrations here as needed
  ]);

  const handleConnectIntegration = (integrationId: string) => {
    const integration = integrations.find(int => int.id === integrationId);
    if (!integration) return;

    if (integration.id === 'shopify') {
      // Specific handling for Shopify as it requires input
      if (!shop.endsWith('.myshopify.com')) {
        alert('Dominio de Shopify inválido. Debe terminar en .myshopify.com');
        return;
      }
      window.location.href = `${integration.connectPath}?shop=${shop}`;
    } else {
      // Generic redirection for other integrations (assuming OAuth flow)
      window.location.href = integration.connectPath;
    }
  };

  return (
    <div className={`${styles.integrationsPageContainer} ${darkMode ? styles.darkMode : ''}`}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroHeadline}>
          Conecta tus Herramientas Favoritas y <span className={styles.lineBreakMobile}></span> Libera el Potencial de tu IA
        </h1>
        <p className={styles.heroSubheadline}>
          Nuestra IA se integra con tus plataformas clave para automatizar tareas, obtener insights valiosos y optimizar tu negocio como nunca antes.
        </p>
      </section>

      {/* Featured Integrations Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Integraciones Destacadas</h2>
        <div className={styles.featuredIntegrationsGrid}>
          {integrations.slice(0, 4).map((integration) => ( // Display first 4 as "Destacadas"
            <div
              key={integration.id}
              className={styles.integrationCard}
            >
              <div className={styles.integrationLogoWrapper}>
                <Image
                  src={integration.logo}
                  alt={`${integration.name} Logo`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h3 className={styles.integrationName}>{integration.name}</h3>
              <p className={styles.integrationDescription}>{integration.description}</p>
              <div className={styles.integrationActions}>
                {integration.isConnected ? (
                  <span className={styles.connectedStatus}>
                    Conectado
                  </span>
                ) : (
                  <>
                    {integration.id === 'shopify' && (
                      <div className={styles.shopifyConnectForm}>
                        <input
                          type="text"
                          value={shop}
                          onChange={(e) => setShop(e.target.value)}
                          placeholder="tutienda.myshopify.com"
                          className={styles.shopifyInput}
                        />
                         <button
                            onClick={() => handleConnectIntegration(integration.id)}
                            className={styles.connectButton}
                          >
                            Conectar Shopify
                          </button>
                      </div>
                    )}
                    {integration.id !== 'shopify' && (
                      <button
                        onClick={() => handleConnectIntegration(integration.id)}
                        className={styles.connectButton}
                      >
                        Conectar
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Integrations Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Todas las Integraciones</h2>
        <div className={styles.allIntegrationsGrid}>
          {integrations.map((integration) => ( // Display all integrations
            <div
              key={integration.id}
              className={`${styles.integrationCard} ${styles.smallCard}`}
            >
              <div className={styles.integrationLogoWrapperSmall}>
                <Image
                  src={integration.logo}
                  alt={`${integration.name} Logo`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h3 className={styles.integrationNameSmall}>{integration.name}</h3>
              <p className={styles.integrationDescriptionSmall}>{integration.description}</p>
              <div className={styles.integrationActions}>
                {integration.isConnected ? (
                  <span className={styles.connectedStatusSmall}>
                    Conectado
                  </span>
                ) : (
                  <>
                     {integration.id === 'shopify' ? (
                        <button
                          onClick={() => handleConnectIntegration(integration.id)}
                          className={styles.connectButtonSmall}
                        >
                          Conectar Shopify
                        </button>
                     ) : (
                        <button
                          onClick={() => handleConnectIntegration(integration.id)}
                          className={styles.connectButtonSmall}
                        >
                          Conectar
                        </button>
                     )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Request New Integration Section */}
      <section className={styles.requestIntegrationSection}>
        <h2 className={styles.requestIntegrationTitle}>¿No encuentras la integración que necesitas?</h2>
        <p className={styles.requestIntegrationDescription}>
          Estamos en constante expansión. Sugiere nuevas integraciones que te gustaría ver y nos pondremos a trabajar en ello.
        </p>
        <button className={styles.suggestButton}>
          Sugerir Integración
        </button>
      </section>
    </div>
  );
}