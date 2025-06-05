// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Script from 'next/script'; // Importa el componente Script de Next.js

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
    <html lang="es">
      <body>
        {/*
          IMPORTANTE: Shopify App Bridge CDN Script.
          Debe cargarse SIEMPRE. La estrategia 'beforeInteractive'
          asegura que esté disponible antes de que la página sea interactiva.
        */}
        <Script
          src="https://cdn.shopify.com/shopifycloud/app-bridge/app-bridge.js"
          strategy="beforeInteractive" // o 'afterInteractive' si causa problemas
        />

        {/* Aquí envuelves los hijos con tu componente de proveedores de cliente */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}