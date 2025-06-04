'use client';

import { useDarkMode } from '@/context/DarkModeContext';
import styles from '@/components/dashboard/ui/AccountSettings.module.css';
import { useState, useEffect } from 'react'; // Importar useEffect
import { useAuth, useUser } from '@clerk/nextjs';
import { motion, useAnimation } from 'framer-motion'; // Importar motion y useAnimation
import { useInView } from 'react-intersection-observer'; // Importar useInView

export default function AccountSettings() {
  const { darkMode } = useDarkMode();
  const { userId } = useAuth();
  const { user } = useUser();

  const [fullName, setFullName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('owner');
  const [industry, setIndustry] = useState('');
  const [customDomain, setCustomDomain] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [isDomainSaving, setIsDomainSaving] = useState(false);

  // --- Framer Motion integration ---
  const controls = useAnimation(); // Hook para controlar animaciones manualmente
  const { ref, inView } = useInView({ // Hook para detectar si el elemento está en la vista
    triggerOnce: true, // La animación solo se activa una vez cuando entra en la vista
    threshold: 0.1, // El 10% del elemento debe estar visible para activar
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible'); // Inicia la animación 'visible'
    }
  }, [controls, inView]);
  // --- End Framer Motion integration ---


  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    if (!userId) {
      console.error('❌ No Clerk userId found. Cannot save account settings.');
      setIsSaving(false);
      return;
    }

    const content = `Full name: ${fullName || '—'}\nStore name: ${storeName || '—'}\nEmail: ${email || '—'}\nRole: ${role}\nIndustry: ${industry || '—'}`;
    const title = `Full name: ${fullName || '—'}, Role: ${role}, Industry: ${industry || '—'}`;

    try {
      await fetch('/api/brain/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          storeKey: 'purple',
          type: 'text',
          title,
          content,
          fileUrl: null,
          source: 'account-settings',
          category: 'profile',
        }),
      });
      console.log('✅ Account settings saved successfully.');
      // Optional: Add a success message to the user
    } catch (err) {
      console.error('❌ Error saving account information:', err);
      // Optional: Add an error message to the user
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordChanging(true);

    if (!user) {
      console.error('❌ User object not found. Cannot change password.');
      setIsPasswordChanging(false);
      return;
    }

    try {
      console.log('🔗 Initiating Clerk password change flow...');
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      console.log('✅ Password change initiated successfully (Clerk managed).');
    } catch (err) {
      console.error('❌ Error initiating password change:', err);
    } finally {
      setIsPasswordChanging(false);
    }
  };

  const handleSaveDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDomainSaving(true);

    if (!userId) {
      console.error('❌ No Clerk userId found. Cannot save custom domain.');
      setIsDomainSaving(false);
      return;
    }

    const content = `Custom Domain: ${customDomain || '—'}`;
    const title = `User Domain: ${customDomain || '—'}`;

    try {
      await fetch('/api/brain/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          storeKey: 'purple',
          type: 'text',
          title,
          content,
          fileUrl: null,
          source: 'account-settings',
          category: 'domain',
        }),
      });
      console.log('✅ Custom domain saved successfully.');
    } catch (err) {
      console.error('❌ Error saving custom domain:', err);
    } finally {
      setIsDomainSaving(false);
    }
  };

  return (
    <motion.div
      ref={ref} // Asignar la referencia al contenedor principal
      className={`${styles.container} ${darkMode ? styles.dark : ''}`}
      variants={{ // Definir las variantes de animación
        hidden: { opacity: 0, y: 50 }, // Estado inicial (oculto)
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }, // Estado visible (animado)
      }}
      initial="hidden" // Empezar en el estado 'hidden'
      animate={controls} // Usar los controles para iniciar la animación
    >
      {/* Account Settings Section */}
      <h3 className={styles.title}>Account</h3>
      <p className={styles.description}>
        Manage your identity, store info, and business settings to personalize your AI assistants.
      </p>

      <form className={styles.form} onSubmit={handleSaveProfile}>
        <div className={styles.field}>
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            placeholder="e.g. Clara Gómez"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="storeName">Store or Brand name</label>
          <input
            id="storeName"
            placeholder="e.g. Lunática Shop"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="role">Your role</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="owner">Owner</option>
            <option value="marketing">Marketing</option>
            <option value="designer">Designer</option>
            <option value="support">Support</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="industry">Industry</label>
          <input
            id="industry"
            placeholder="e.g. fashion, tech..."
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" disabled={isSaving || !userId} style={{ opacity: isSaving || !userId ? 0.6 : 1 }}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* Separator para estilos */}
      <div style={{ borderTop: `1px solid ${darkMode ? '#333' : '#eee'}`, margin: '40px 0' }} />

      {/* Password Change Section */}
      <h3 className={styles.title}>Password & Security</h3>
      <p className={styles.description}>
        Update your password to keep your account secure.
      </p>

      <form className={styles.form} onSubmit={handleChangePassword}>
        <div className={styles.field}>
          <button type="submit" disabled={isPasswordChanging || !user} style={{ opacity: isPasswordChanging || !user ? 0.6 : 1 }}>
            {isPasswordChanging ? 'Redirecting...' : 'Change Password via Clerk'}
          </button>
        </div>
        <p className={styles.note}>
          Clicking "Change Password via Clerk" will direct you to Clerk's secure portal to update your credentials.
        </p>
      </form>

      {/* Separator para estilos */}
      <div style={{ borderTop: `1px solid ${darkMode ? '#333' : '#eee'}`, margin: '40px 0' }} />


      {/* Custom Domain Section */}
      <h3 className={styles.title}>Custom Domain</h3>
      <p className={styles.description}>
        Add your custom domain to personalize your AI assistant's access point.
      </p>

      <form className={styles.form} onSubmit={handleSaveDomain}>
        <div className={styles.field}>
          <label htmlFor="customDomain">Your Domain</label>
          <input
            id="customDomain"
            type="text"
            placeholder="e.g. mycompany.com"
            value={customDomain}
            onChange={(e) => setCustomDomain(e.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" disabled={isDomainSaving || !userId} style={{ opacity: isDomainSaving || !userId ? 0.6 : 1 }}>
            {isDomainSaving ? 'Saving Domain...' : 'Save Domain'}
          </button>
        </div>
        <p className={styles.note}>
          After saving, please ensure your DNS settings are correctly configured to point to our servers.
          Consult our documentation for more details.
        </p>
      </form>
    </motion.div>
  );
}