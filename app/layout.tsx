export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = {
  title: 'StorelyAI',
  description: 'Transforma tu ecommerce con inteligencia artificial avanzada.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      localization={{
        socialButtonsBlockButton: 'Continuar con {{provider|titleize}}',
        formFieldLabel__emailAddress: 'Correo electrónico',
        formFieldLabel__password: 'Contraseña',
        signIn: { start: { title: 'Inicia sesión en tu cuenta' } },
        signUp: { start: { title: 'Crea tu cuenta' } },
      }}
    >
      <html lang="es">
        <head>
          {/* Trustpilot widget */}
          <script
            type="text/javascript"
            src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
            async
          ></script>

          {/* Shopify App Bridge desde CDN */}
          <meta
            name="shopify-api-key"
            content={process.env.NEXT_PUBLIC_SHOPIFY_API_KEY}
          />
          <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
        </head>
        <body
          suppressHydrationWarning
          style={{
            margin: 0,
            padding: 0,
            backgroundColor: '#ffffff', // blanco por defecto
            color: '#111827',
            overflowX: 'hidden',
            minHeight: '100vh',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
