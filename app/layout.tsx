export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import EmbeddedRedirector from '@/components/common/EmbeddedRedirector';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'StorelyAI',
  description: 'Transforma tu ecommerce con inteligencia artificial avanzada.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const xNextUrl = headersList.get('x-next-url') ?? '';
  const searchParams = new URLSearchParams(xNextUrl.split('?')[1] ?? '');
  const isEmbedded = searchParams.get('embedded') === '1';

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

          {/* Shopify App Bridge CDN Script — se carga siempre */}
          <meta
            name="shopify-api-key"
            content="a0f3598698f796710ae6252e2417b103"
          />
          <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
        </head>
        <body
          suppressHydrationWarning
          style={{
            margin: 0,
            padding: 0,
            backgroundColor: '#0a0012',
            color: '#f3f4f6',
            overflowX: 'hidden',
            minHeight: '100vh',
            fontFamily: "'Inter', sans-serif",
            position: 'relative',
          }}
        >
          {/* Redirección automática si está embebido en Shopify */}
          <EmbeddedRedirector />

          <div
            style={{
              minHeight: '100vh',
              position: 'relative',
              zIndex: 1,
              background: 'transparent',
            }}
          >
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
