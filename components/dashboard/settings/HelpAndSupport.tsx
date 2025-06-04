// components/dashboard/settings/HelpAndSupport.tsx
'use client';

import { useDarkMode } from '@/context/DarkModeContext';
import styles from '@/components/dashboard/ui/AccountSettings.module.css'; // Reutilizamos los estilos existentes
import { useState } from 'react'; // Necesario si quieres manejar estados internos
import Link from 'next/link'; // Para enlaces externos/internos

// Asumo que tienes un contexto de idioma o una función 't' global para las traducciones
import { useLanguage } from '@/context/LanguageContext'; // Ajusta la ruta si es diferente

export default function HelpAndSupport() {
  const { darkMode } = useDarkMode();
  const { t } = useLanguage(); // Usamos el hook de idioma

  // Puedes añadir estados si, por ejemplo, quisieras un formulario de contacto aquí
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSupport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Aquí iría la lógica para enviar un formulario de contacto,
    // o redirigir a un sistema de tickets, etc.
    console.log('Enviando solicitud de soporte...');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simular envío
    console.log('Solicitud enviada. ¡Gracias por contactarnos!');
    setIsSubmitting(false);
    // Opcional: Mostrar un mensaje de éxito al usuario
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ''}`}>
      <h3 className={styles.title}>{t('helpAndSupport.title')}</h3>
      <p className={styles.description}>
        {t('helpAndSupport.description')}
      </p>

      <div className={styles.form}> {/* Usamos form para mantener la consistencia de estilos */}
        {/* Sección de Preguntas Frecuentes (FAQ) */}
        <div className={styles.field}> {/* Reutilizamos estilo de campo para un bloque */}
          <label className={styles.label}>{t('helpAndSupport.faqTitle')}</label>
          <p className={styles.note} style={{ marginBottom: '1rem' }}>
            {t('helpAndSupport.faqDescription')}
          </p>
          <Link href="/dashboard/help/faq" passHref>
            <button className={styles.actionsButton}>
              {t('helpAndSupport.faqButton')}
            </button>
          </Link>
        </div>

        {/* Sección de Documentación */}
        <div className={styles.field}>
          <label className={styles.label}>{t('helpAndSupport.docsTitle')}</label>
          <p className={styles.note} style={{ marginBottom: '1rem' }}>
            {t('helpAndSupport.docsDescription')}
          </p>
          <a href="https://your-docs-link.com" target="_blank" rel="noopener noreferrer">
            <button className={styles.actionsButton}>
              {t('helpAndSupport.docsButton')}
            </button>
          </a>
        </div>

        {/* Sección de Contacto Directo */}
        <div className={styles.field}>
          <label className={styles.label}>{t('helpAndSupport.contactTitle')}</label>
          <p className={styles.note} style={{ marginBottom: '1rem' }}>
            {t('helpAndSupport.contactDescription')}
          </p>
          <form onSubmit={handleContactSupport}>
            {/* Aquí podrías poner un campo de texto para el mensaje, etc. */}
            <textarea
              placeholder={t('helpAndSupport.contactPlaceholder')}
              rows={5}
              style={{
                width: '100%',
                padding: '0.6rem 0.8rem',
                fontSize: '1rem',
                border: darkMode ? '1px solid #444' : '1px solid #ccc',
                borderRadius: '8px',
                background: darkMode ? '#2a2a2a' : '#f9f9f9',
                color: darkMode ? '#f4f4f5' : '#111',
                marginBottom: '1rem',
                resize: 'vertical'
              }}
            ></textarea>
            <div className={styles.actions}>
              <button type="submit" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.6 : 1 }}>
                {isSubmitting ? t('helpAndSupport.contactSending') : t('helpAndSupport.contactButton')}
              </button>
            </div>
          </form>
        </div>

        {/* Espacio para añadir un widget de chat o un enlace a un foro */}
        <div className={styles.field}>
            <label className={styles.label}>{t('helpAndSupport.communityTitle')}</label>
            <p className={styles.note} style={{ marginBottom: '1rem' }}>
                {t('helpAndSupport.communityDescription')}
            </p>
            <Link href="https://your-community-forum.com" target="_blank" rel="noopener noreferrer">
                <button className={styles.actionsButton}>
                    {t('helpAndSupport.communityButton')}
                </button>
            </Link>
        </div>

      </div>
    </div>
  );
}