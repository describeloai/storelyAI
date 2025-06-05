'use client'; // ¡Es crucial que sea un Client Component!

import { useEffect } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { LanguageProvider } from '@/context/LanguageContext';
import { DarkModeProvider, useDarkMode } from '@/context/DarkModeContext';
import LanguageSetter from './LanguageSetter';

// Envoltura para manejar la clase `dark` en el body según contexto
function BodyClassManager({ children }: { children: React.ReactNode }) {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
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
          <BodyClassManager>
            <LanguageSetter>
              {children}
            </LanguageSetter>
          </BodyClassManager>
        </DarkModeProvider>
      </LanguageProvider>
    </ClerkProvider>
  );
}
