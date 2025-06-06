// app/providers.tsx
'use client';

import { useEffect } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { LanguageProvider } from '@/context/LanguageContext';
import { DarkModeProvider, useDarkMode } from '@/context/DarkModeContext';
import LanguageSetter from './LanguageSetter';

// Envoltura para manejar el atributo `data-theme` en el body según contexto
function BodyThemeManager({ children }: { children: React.ReactNode }) { // Renombré para claridad
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.body.setAttribute('data-theme', 'dark'); // <-- ¡Cambio aquí!
    } else {
      document.body.removeAttribute('data-theme'); // <-- ¡Cambio aquí!
    }
  }, [darkMode]);

  return <>{children}</>;
}

// Componente principal de proveedores
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <LanguageProvider>
        <DarkModeProvider>
          <BodyThemeManager> {/* <-- Usar el nuevo nombre del componente */}
            <LanguageSetter>
              {children}
            </LanguageSetter>
          </BodyThemeManager>
        </DarkModeProvider>
      </LanguageProvider>
    </ClerkProvider>
  );
}