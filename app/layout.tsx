import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers'; // <--- ¡Importa tu nuevo componente Providers!

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'StorelyAI Dashboard',
  description: 'Your AI-powered e-commerce assistant dashboard',
};

// Este es el Root Layout de tu aplicación. Es un Server Component por defecto.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // La etiqueta <html> y <body> deben estar aquí, en el Root Layout.
    // El atributo lang="es" es un valor inicial que luego LanguageSetter actualizará.
    <html lang="es">
      <body>
        {/* Aquí envuelves los hijos con tu componente de proveedores de cliente */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}