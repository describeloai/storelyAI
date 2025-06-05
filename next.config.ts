// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    Aquí puedes añadir otras opciones de configuración de Next.js si las tienes,
    por ejemplo:
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone', // Si usas esto para Docker
  */

  // --- Configuración de Cabeceras HTTP (CSP) ---
  async headers() {
    return [
      {
        source: '/:path*', // Aplica estas cabeceras a todas las rutas de tu aplicación
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' https://cdn.shopify.com https://*.clerk.accounts.dev https://*.clerk.com;
              connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com;
              frame-src 'self' https://*.clerk.accounts.dev https://*.clerk.com;
              
              // IMPORTANTE:
              // Esta directiva 'frame-ancestors' con el comodín (*.myshopify.com)
              // es para propósitos de TESTING/DESARROLLO si no puedes usar middleware.
              //
              // Shopify ES MUY ESTRICTO con esto para APPS PÚBLICAS en producción.
              // Es muy probable que este comodín cause que tu aplicación sea RECHAZADA
              // en el proceso de revisión final, ya que Shopify exige un dominio de tienda exacto.
              //
              // Para la versión final, la directiva debería ser dinámica (ej. https://[shop].myshopify.com),
              // lo cual es mejor con un middleware.ts o con una configuración oficial de Shopify.
              frame-ancestors https://admin.shopify.com https://*.myshopify.com;
              
              img-src 'self' data: blob: https://cdn.shopify.com https://*.clerk.accounts.dev https://*.clerk.com;
              style-src 'self' 'unsafe-inline'; // 'unsafe-inline' puede ser necesario para estilos inyectados por JS
              font-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              block-all-mixed-content;
              upgrade-insecure-requests;
            `.replace(/\s+/g, ' ').trim(), // Elimina espacios extra y recorta para una sola línea
          },
          // --- Otras cabeceras de seguridad recomendadas ---
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            // 'X-Frame-Options' es una cabecera más antigua que también ayuda con clickjacking.
            // Puede ser redundante si 'frame-ancestors' es bien manejado, pero no hace daño.
            value: 'ALLOW-FROM https://admin.shopify.com',
            key: 'X-Frame-Options',
          },
        ],
      },
    ];
  },
};

export default nextConfig;