'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Define el tipo para las traducciones
type Translations = {
  [key: string]: any; // Permite objetos anidados
};

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, variables?: Record<string, string | number>) => string; // Función de traducción
  translationsLoaded: boolean; // Para saber si las traducciones están cargadas
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState('es'); // Idioma por defecto
  const [translations, setTranslations] = useState<Translations>({});
  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  // Carga el idioma guardado al iniciar.
  // typeof navigator !== 'undefined' para asegurar que corre solo en el cliente.
  useEffect(() => {
    const storedLang = localStorage.getItem('userLanguage');
    const initialLang = storedLang || (typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'es') || 'es';
    setLanguageState(initialLang);
  }, []);

  // Carga las traducciones cuando cambia el idioma
  useEffect(() => {
    const loadTranslations = async () => {
      setTranslationsLoaded(false);
      try {
        // Asegúrate que esta ruta es correcta después de mover la carpeta a 'public'
        const response = await fetch(`/locales/${language}.json`); // <--- ¡RUTA CORREGIDA!
        if (!response.ok) {
          console.warn(`No translations found for ${language}, falling back to 'es'.`);
          const fallbackResponse = await fetch('/locales/es.json'); // <--- ¡RUTA CORREGIDA!
          const fallbackData = await fallbackResponse.json();
          setTranslations(fallbackData);
          setLanguageState('es'); // Establece el idioma a 'es' si no se encuentra el original
        } else {
          const data = await response.json();
          setTranslations(data);
        }
      } catch (error) {
        console.error('Error loading translations:', error);
        // En caso de error, intentar cargar el idioma por defecto
        try {
          const fallbackResponse = await fetch('/locales/es.json'); // <--- ¡RUTA CORREGIDA!
          const fallbackData = await fallbackResponse.json();
          setTranslations(fallbackData);
          setLanguageState('es');
        } catch (fallbackError) {
          console.error('Failed to load fallback translations:', fallbackError);
        }
      } finally {
        setTranslationsLoaded(true);
      }
    };

    loadTranslations();
  }, [language]); // Vuelve a cargar si el idioma cambia

  // Función para establecer el idioma y persistirlo
  const setLanguage = useCallback((lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('userLanguage', lang);
  }, []);

  // Función de traducción
  const t = useCallback((key: string, variables?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let translatedText: any = translations;
    for (const k of keys) {
      if (translatedText && typeof translatedText === 'object' && k in translatedText) {
        translatedText = translatedText[k];
      } else {
        // Solo advertir si las traducciones ya están cargadas para evitar spam en consola al inicio
        if (translationsLoaded) {
          console.warn(`Translation key "${key}" not found (missing part: "${k}")`);
        }
        return key; // Retorna la clave si no se encuentra la traducción
      }
    }

    if (typeof translatedText === 'string') {
      // Reemplaza variables en la cadena traducida (ej. "Hello, {name}")
      if (variables) {
        for (const varKey in variables) {
          translatedText = translatedText.replace(`{${varKey}}`, String(variables[varKey]));
        }
      }
      return translatedText;
    }

    return key; // Si no es una cadena, devuelve la clave
  }, [translations, translationsLoaded]); // Añadido translationsLoaded como dependencia

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translationsLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}