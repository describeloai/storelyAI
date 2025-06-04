'use client'; // Indica que este es un Client Component

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext'; // Asegúrate que esta ruta sea correcta

// Este componente es responsable de establecer el atributo 'lang' del elemento <html>
// Se renderiza dentro de LanguageProvider en el Root Layout, por lo que puede usar useLanguage.
export default function LanguageSetter({ children }: { children: React.ReactNode }) {
  const { language, translationsLoaded } = useLanguage();

  useEffect(() => {
    // Solo actualiza el atributo lang del documento si las traducciones están cargadas
    // y si estamos en el cliente (document object está disponible).
    if (translationsLoaded && typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language, translationsLoaded]);

  // Simplemente renderiza sus hijos, su propósito es solo ejecutar el efecto secundario
  return <>{children}</>;
}