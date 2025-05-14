import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Ya no cargamos App Bridge desde la CDN porque se importa vía NPM */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
