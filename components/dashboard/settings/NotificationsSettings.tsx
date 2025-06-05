'use client';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState, useEffect } from 'react';
import styles from '@/components/dashboard/ui/NotificationsSettings.module.css'; // Import the CSS module

// Define types for notification settings and history
type NotificationSetting = {
  enabled: boolean;
  channels: {
    email: boolean;
    inApp: boolean;
    push: boolean;
    slack: boolean;
  };
  description: string;
};

type NotificationCategory = {
  title: string;
  description: string;
  types: {
    [key: string]: NotificationSetting;
  };
};

type NotificationHistoryItem = {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  read: boolean;
};

export default function NotificationsSettings() {
  const { darkMode } = useDarkMode();
  const themeClass = darkMode ? styles.dark : styles.light;

  // State for Do Not Disturb (DND)
  const [dndEnabled, setDndEnabled] = useState(false);

  // State for selected role for notification preferences
  const [selectedRole, setSelectedRole] = useState('user'); // 'user', 'marketing', 'operations', 'product', 'management'

  // State for notification settings, initialized with default values
  const [notificationPreferences, setNotificationPreferences] = useState<{ [key: string]: NotificationCategory }>({
    criticalAlerts: {
      title: 'Critical AI Alerts',
      description: 'Important notifications requiring immediate attention from AI insights.',
      types: {
        performanceAnomalies: {
          enabled: true,
          channels: { email: true, inApp: true, push: true, slack: false },
          description: 'Anomalías en Rendimiento: Caída de ventas, picos inusuales de tráfico, etc.',
        },
        urgentPredictions: {
          enabled: true,
          channels: { email: true, inApp: true, push: true, slack: false },
          description: 'Predicciones con Alta Urgencia: Stock bajo inminente, riesgo de abandono de carrito elevado.',
        },
        aiFailures: {
          enabled: true,
          channels: { email: true, inApp: true, push: true, slack: false },
          description: 'Errores o Fallos en la IA: Problemas con la ejecución de tareas automatizadas por la IA.',
        },
      },
    },
    aiSuggestions: {
      title: 'AI Suggestions & Optimizations',
      description: 'Actionable recommendations from AI to improve e-commerce performance.',
      types: {
        productRecommendations: {
          enabled: true,
          channels: { email: true, inApp: true, push: false, slack: false },
          description: 'Recomendaciones de Productos/Contenido: La IA sugiere cambios para mejorar conversiones.',
        },
        dynamicPricing: {
          enabled: false,
          channels: { email: true, inApp: true, push: false, slack: false },
          description: 'Ajustes de Precios Dinámicos: La IA propone cambios de precios basados en la competencia o la demanda.',
        },
        customerSegmentation: {
          enabled: true,
          channels: { email: true, inApp: true, push: false, slack: false },
          description: 'Oportunidades de Segmentación de Clientes: La IA identifica nuevos segmentos o mejoras en los existentes.',
        },
        marketingCampaigns: {
          enabled: true,
          channels: { email: true, inApp: true, push: false, slack: true },
          description: 'Sugerencias de Campañas de Marketing: Basado en el análisis de datos de clientes y productos.',
        },
      },
    },
    periodicReports: {
      title: 'Periodic Summaries & Reports',
      description: 'Regular digests of AI-generated insights and performance overviews.',
      types: {
        dailyWeeklySummaries: {
          enabled: true,
          channels: { email: true, inApp: false, push: false, slack: false },
          description: 'Resúmenes Diarios/Semanales del Rendimiento: La IA compila los datos más importantes y las tendencias.',
        },
        kpiReports: {
          enabled: true,
          channels: { email: true, inApp: true, push: false, slack: true },
          description: 'Informes de Métricas Clave (KPIs): Resúmenes personalizados de las métricas más importantes.',
        },
        marketTrends: {
          enabled: true,
          channels: { email: true, inApp: false, push: false, slack: false },
          description: 'Tendencias del Mercado: La IA identifica tendencias emergentes relevantes para el e-commerce.',
        },
      },
    },
  });

  // State for notification history
  const [notificationHistory, setNotificationHistory] = useState<NotificationHistoryItem[]>([
    { id: '1', type: 'Performance Anomaly', message: 'Sales dropped by 15% in the last 24 hours.', timestamp: '2025-06-04 10:30 AM', read: false },
    { id: '2', type: 'Urgent Prediction', message: 'Product A is predicted to be out of stock in 2 days.', timestamp: '2025-06-03 09:00 AM', read: true },
    { id: '3', type: 'AI Suggestion', message: 'Consider optimizing ad spend for Product B based on current ROI.', timestamp: '2025-06-02 03:45 PM', read: true },
    { id: '4', type: 'Daily Summary', message: 'Your daily e-commerce summary report is ready.', timestamp: '2025-06-02 08:00 AM', read: true },
  ]);

  const [historySearchTerm, setHistorySearchTerm] = useState('');

  // Function to handle toggle switch changes
  const handleToggleChange = (categoryKey: string, typeKey: string) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        types: {
          ...prev[categoryKey].types,
          [typeKey]: {
            ...prev[categoryKey].types[typeKey],
            enabled: !prev[categoryKey].types[typeKey].enabled,
          },
        },
      },
    }));
  };

  // Function to handle channel checkbox changes
  const handleChannelChange = (categoryKey: string, typeKey: string, channel: keyof NotificationSetting['channels']) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        types: {
          ...prev[categoryKey].types, // Accedemos a los tipos de la categoría
          [typeKey]: {
            ...prev[categoryKey].types[typeKey], // CORRECTO: Accedemos al tipo específico dentro de la categoría
            channels: {
              ...prev[categoryKey].types[typeKey].channels,
              [channel]: !prev[categoryKey].types[typeKey].channels[channel],
            },
          },
        },
      },
    }));
  };

  // Simulate saving settings (in a real app, this would be an API call)
  const saveSettings = () => {
    console.log('Saving notification preferences:', notificationPreferences);
    console.log('Do Not Disturb status:', dndEnabled);
    // In a real application, you'd send this data to your backend
    alert('Notification settings saved successfully!');
  };

  // Filtered history based on search term
  const filteredHistory = notificationHistory.filter(item =>
    item.message.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(historySearchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); // Sort by most recent

  // Effect to load preferences based on selected role (simulation)
  useEffect(() => {
    // In a real app, you'd fetch preferences for the selected role from an API
    console.log(`Loading preferences for role: ${selectedRole}`);
    // For demonstration, we'll just reset to default or apply a predefined set
    // For now, we'll stick to the initial default for simplicity, but in a real app
    // you'd have a mechanism to load and save role-specific settings.
  }, [selectedRole]);

  return (
    <div className={styles.container}>
      <h3 className={`${styles.title} ${themeClass}`}>Notifications Settings</h3>
      <p className={`${styles.description} ${themeClass}`}>Choose which events should notify you and how.</p>

      {/* Preferences by Role/Team */}
      <div className={`${styles.section} ${themeClass}`}>
        <h4 className={`${styles.subTitle} ${themeClass}`}>Notification Preferences by Role</h4>
        <div className={styles.roleSelectContainer}>
          <label htmlFor="role-select">View/Edit preferences for:</label>
          <select
            id="role-select"
            className={`${styles.roleSelect} ${themeClass}`}
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="user">My Personal Preferences</option>
            <option value="marketing">Marketing Team</option>
            <option value="operations">Operations & Logistics Team</option>
            <option value="product">Product Team</option>
            <option value="management">Management/Executive Team</option>
          </select>
        </div>
        <p className={`${styles.description} ${themeClass}`} style={{ textAlign: 'left', marginBottom: '1rem' }}>
          *Note: Changes made here for team roles might affect multiple users.
        </p>
      </div>

      {/* Notification Categories */}
      {Object.entries(notificationPreferences).map(([categoryKey, category]) => (
        <div key={categoryKey} className={`${styles.section} ${themeClass}`}>
          <h4 className={`${styles.subTitle} ${themeClass}`}>{category.title}</h4>
          <p className={`${styles.description} ${themeClass}`} style={{ textAlign: 'left' }}>{category.description}</p>

          {Object.entries(category.types).map(([typeKey, setting]) => (
            <div key={typeKey} className={`${styles.category} ${themeClass}`}>
              <div className={styles.categoryHeader}>
                <div>
                  <h5 className={`${styles.categoryTitle} ${themeClass}`}>{setting.description.split(':')[0].trim()}</h5>
                  <p className={`${styles.categoryDescription} ${themeClass}`}>
                    {setting.description.includes(':') ? setting.description.split(':')[1].trim() : setting.description}
                  </p>
                </div>
                <label className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    checked={setting.enabled}
                    onChange={() => handleToggleChange(categoryKey, typeKey)}
                  />
                  <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
              </div>

              {setting.enabled && (
                <div className={styles.channelOptions}>
                  <p className={`${styles.text} ${themeClass}`} style={{ marginRight: '1rem', flexShrink: 0 }}>Notify via:</p>
                  <label className={styles.channelOption}>
                    <input
                      type="checkbox"
                      checked={setting.channels.email}
                      onChange={() => handleChannelChange(categoryKey, typeKey, 'email')}
                    /> Email
                  </label>
                  <label className={styles.channelOption}>
                    <input
                      type="checkbox"
                      checked={setting.channels.inApp}
                      onChange={() => handleChannelChange(categoryKey, typeKey, 'inApp')}
                    /> In-App
                  </label>
                  <label className={styles.channelOption}>
                    <input
                      type="checkbox"
                      checked={setting.channels.push}
                      onChange={() => handleChannelChange(categoryKey, typeKey, 'push')}
                    /> Push
                  </label>
                  <label className={styles.channelOption}>
                    <input
                      type="checkbox"
                      checked={setting.channels.slack}
                      onChange={() => handleChannelChange(categoryKey, typeKey, 'slack')}
                    /> Slack
                  </label>
                  {/* You could add more channels here (e.g., Teams, Webhooks) */}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Do Not Disturb (DND) */}
      <div className={`${styles.section} ${themeClass}`}>
        <h4 className={`${styles.subTitle} ${themeClass}`}>Do Not Disturb (DND)</h4>
        <div className={styles.dndSection}>
          <label htmlFor="dnd-toggle">Pause all notifications temporarily</label>
          <label className={styles.toggleSwitch}>
            <input
              id="dnd-toggle"
              type="checkbox"
              checked={dndEnabled}
              onChange={() => setDndEnabled(!dndEnabled)}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
        {dndEnabled && (
          <p className={`${styles.description} ${themeClass}`} style={{ textAlign: 'left', marginTop: '1rem' }}>
            All notifications are paused. You will not receive any alerts until DND is turned off.
          </p>
        )}
      </div>

      {/* Save Button */}
      <button className={styles.button} onClick={saveSettings}>Save Changes</button>

      {/* Notification History */}
      <div className={`${styles.section} ${themeClass}`}>
        <h4 className={`${styles.subTitle} ${themeClass}`}>Notification History</h4>
        <div className={styles.historyHeader}>
          <p className={`${styles.description} ${themeClass}`} style={{ marginBottom: '0', textAlign: 'left' }}>Review past notifications from your AI assistant.</p>
          <input
            type="text"
            placeholder="Search history..."
            className={`${styles.filterInput} ${themeClass}`}
            value={historySearchTerm}
            onChange={(e) => setHistorySearchTerm(e.target.value)}
          />
        </div>
        <div className={`${styles.notificationList} ${themeClass}`}>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <div key={item.id} className={`${styles.notificationItem} ${themeClass}`}>
                <p className={`${styles.notificationType} ${themeClass}`}>{item.type}</p>
                <p className={`${styles.text} ${themeClass}`}>{item.message}</p>
                <p className={`${styles.notificationTime} ${themeClass}`}>{item.timestamp} {item.read ? '(Read)' : '(Unread)'}</p>
              </div>
            ))
          ) : (
            <p className={`${styles.text} ${themeClass}`}>No notifications found in history.</p>
          )}
        </div>
      </div>
    </div>
  );
}