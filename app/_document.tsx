// app/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Cargar App Bridge desde la CDN para que Shopify marque el check ✅ */}
        <script src="https://unpkg.com/@shopify/app-bridge"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
