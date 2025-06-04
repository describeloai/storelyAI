'use client'; // ¡Es crucial que sea un Client Component!

import { ClerkProvider } from '@clerk/nextjs';
import { LanguageProvider } from '@/context/LanguageContext'; // Tu contexto de idioma
import { DarkModeProvider } from '@/context/DarkModeContext'; // Tu contexto de modo oscuro
import LanguageSetter from './LanguageSetter'; // Tu componente para establecer el atributo lang del html

// Este componente encapsula todos los proveedores de cliente.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // ClerkProvider debe ser el más externo de tus proveedores de autenticación
    <ClerkProvider>
      <LanguageProvider>
        <DarkModeProvider>
          {/* LanguageSetter es un Client Component que necesita ser un hijo de los proveedores */}
          <LanguageSetter>
            {children}
          </LanguageSetter>
        </DarkModeProvider>
      </LanguageProvider>
    </ClerkProvider>
  );
}