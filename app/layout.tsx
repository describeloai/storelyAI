// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css'; // ¡Importante! Aquí se importan tus estilos globales
import { Providers } from './providers'; // Este componente será un Client Component
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'StorelyAI Dashboard',
  description: 'Your AI-powered e-commerce assistant dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Script
          src="https://cdn.shopify.com/shopifycloud/app-bridge/app-bridge.js"
          strategy="beforeInteractive"
        />

        {/* Providers es donde se manejará el estado de DarkMode */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}