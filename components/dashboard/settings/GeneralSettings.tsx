'use client';

import React, { useState, useEffect } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import { useLanguage } from '@/context/LanguageContext';
import styles from '@/components/dashboard/ui/GeneralSettings.module.css';
import { useUser } from '@clerk/nextjs';
import { motion, useAnimationControls } from 'framer-motion'; // Importar motion y useAnimationControls
import { useInView } from 'react-intersection-observer'; // Importar useInView

const GeneralSettings = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { language, setLanguage, t, translationsLoaded } = useLanguage();
  const { user, isLoaded } = useUser();

  // --- Framer Motion: Para animar la entrada del componente ---
  const controls = useAnimationControls(); // Usamos useAnimationControls directamente
  const { ref, inView } = useInView({ // Hook para detectar si el elemento está en la vista
    triggerOnce: true, // La animación solo se activa una vez
    threshold: 0.1, // El 10% del elemento debe estar visible
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  // --- Fin Framer Motion ---

  const [storeKey, setStoreKey] = useState('purple');

  const [workspaceName, setWorkspaceName] = useState('Mi Tienda Online SaaS');
  const [timezone, setTimezone] = useState('Europe/London (GMT+01:00)');
  const [interfaceTheme, setInterfaceTheme] = useState(darkMode ? 'Dark' : 'Light');

  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setInterfaceTheme(darkMode ? 'Dark' : 'Light');
  }, [darkMode]);

  useEffect(() => {
    // Lógica para cargar ajustes del usuario (si los hubiera en el backend, vinculados al userId)
    // Asegúrate de que user.id esté disponible antes de intentar cargar datos específicos del usuario.
    /*
    if (isLoaded && user?.id) {
      const loadUserSettings = async () => {
        // Ahora el GET endpoint necesita el userId en los query params
        // const response = await fetch(`/api/brain?userId=${user.id}&storeKey=${storeKey}`);
        // ...
      };
      loadUserSettings();
    }
    */
  }, [isLoaded, user?.id, storeKey]); // Añade storeKey como dependencia si loadUserSettings lo usa

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
  };

  const handleInterfaceThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value;
    setInterfaceTheme(newTheme);
    if ((newTheme === 'Dark' && !darkMode) || (newTheme === 'Light' && darkMode)) {
      toggleDarkMode();
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setMessage('');

    if (!isLoaded || !user || !user.id) {
      setMessage(t('generalSettings.errorMessage') + ' Usuario no autenticado o ID no disponible.');
      setIsSaving(false);
      console.error('Error: User not loaded or user.id is null/undefined.');
      return;
    }

    const settingsData = {
      workspaceName,
      language,
      timezone,
      interfaceTheme,
    };

    const contentToSave = JSON.stringify(settingsData);
    const titleToSave = `General Settings for ${workspaceName} (User: ${user.id})`;
    const categoryToSave = 'settings';
    const typeToSave = 'text';

    try {
      const response = await fetch('/api/brain/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id, // <--- ¡Aquí pasamos el ID REAL del usuario de Clerk!
          storeKey,
          title: titleToSave,
          content: contentToSave,
          category: categoryToSave,
          type: typeToSave,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(t('generalSettings.successMessage'));
        console.log('Ajustes guardados en el Brain AI:', data.item);
      } else {
        setMessage(`${t('generalSettings.errorMessage')} ${data.error || 'Desconocido'}`);
        console.error('Error al guardar ajustes:', data.error);
      }
    } catch (error) {
      setMessage(t('generalSettings.errorMessage') + ' Error de red o del servidor.');
      console.error('Error en la llamada a la API:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!translationsLoaded || !isLoaded) {
    return (
      <div className={`${styles.container} ${darkMode ? styles.dark : styles.light}`} style={{textAlign: 'center', padding: '2rem'}}>
        Cargando ajustes y datos de usuario...
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`${styles.container} ${darkMode ? styles.dark : styles.light}`} style={{textAlign: 'center', padding: '2rem'}}>
        {t('generalSettings.errorMessage')} Por favor, inicia sesión para acceder a los ajustes.
      </div>
    );
  }

  return (
    // ¡Aquí se aplica Framer Motion al contenedor principal!
    <motion.div
      ref={ref} // Asigna la referencia para detectar la visibilidad
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
      variants={{ // Define las variantes de animación
        hidden: { opacity: 0, y: 50 }, // Estado inicial (oculto y ligeramente abajo)
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }, // Estado visible (animado)
      }}
      initial="hidden" // Comienza en el estado 'hidden'
      animate={controls} // Usa los controles para iniciar la animación cuando es visible
    >
      <h1 className={`${styles.title} ${darkMode ? styles.dark : styles.light}`}>
        {t('generalSettings.title')}
      </h1>
      <p className={`${styles.description} ${darkMode ? styles.dark : styles.light}`}>
        {t('generalSettings.description')}
      </p>

      <div className="space-y-6">
        <div className={styles.formGroup}>
          <label htmlFor="workspaceName" className={`${styles.label} ${darkMode ? styles.dark : styles.light}`}>
            {t('generalSettings.workspaceNameLabel')}
          </label>
          <input
            type="text"
            id="workspaceName"
            className={`${styles.input} ${darkMode ? styles.dark : styles.light}`}
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="language" className={`${styles.label} ${darkMode ? styles.dark : styles.light}`}>
            {t('generalSettings.languageLabel')}
          </label>
          <select
            id="language"
            className={`${styles.select} ${darkMode ? styles.dark : styles.light}`}
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="es">Español (ES)</option>
            <option value="en">English (US)</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="timezone" className={`${styles.label} ${darkMode ? styles.dark : styles.light}`}>
            {t('generalSettings.timezoneLabel')}
          </label>
          <select
            id="timezone"
            className={`${styles.select} ${darkMode ? styles.dark : styles.light}`}
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            <option>Europe/London (GMT+01:00)</option>
            <option>America/New_York (GMT-04:00)</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="interfaceTheme" className={`${styles.label} ${darkMode ? styles.dark : styles.light}`}>
            {t('generalSettings.interfaceThemeLabel')}
          </label>
          <select
            id="interfaceTheme"
            className={`${styles.select} ${darkMode ? styles.dark : styles.light}`}
            value={interfaceTheme}
            onChange={handleInterfaceThemeChange}
          >
            <option value="Dark">Dark</option>
            <option value="Light">Light</option>
          </select>
        </div>
      </div>

      {message && (
        // ¡Aquí se aplica Framer Motion al mensaje!
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }} // Animación de salida (necesita AnimatePresence si se va a desmontar)
          transition={{ duration: 0.3 }}
          className={`mt-6 p-3 rounded-md text-center ${message.includes('Error') ? 'bg-red-600' : 'bg-green-600'} text-white`}
        >
          {message}
        </motion.div>
      )}

      <div className={styles.buttonContainer}>
        <button
          type="button"
          className={`${styles.button} ${styles.secondaryButton} ${darkMode ? styles.dark : styles.light}`}
          onClick={() => {
            setMessage('');
            const storedLanguage = localStorage.getItem('userLanguage');
            if (storedLanguage) {
              setLanguage(storedLanguage);
            }
            setInterfaceTheme(darkMode ? 'Dark' : 'Light');
          }}
        >
          {t('generalSettings.cancel')}
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.primaryButton}`}
          onClick={handleSaveChanges}
          disabled={isSaving}
        >
          {isSaving ? t('generalSettings.saving') : t('generalSettings.saveChanges')}
        </button>
      </div>
    </motion.div>
  );
};

export default GeneralSettings;