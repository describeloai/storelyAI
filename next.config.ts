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
            // Asegúrate de que esta cadena NO tenga comentarios // o saltos de línea inesperados
            // dentro de las comillas invertidas (` `), ya que podrían invalidar la directiva.
            // Los saltos de línea y espacios se limpiarán con .replace() y .trim().
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' https://cdn.shopify.com https://*.clerk.accounts.dev https://*.clerk.com;
              connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com;
              frame-src 'self' https://*.clerk.accounts.dev https://*.clerk.com;
              
              // IMPORTANTE:
              // Esta directiva 'frame-ancestors' con el comodín (*.myshopify.com)
              // es para TESTING/DESARROLLO si no puedes usar middleware.
              //
              // Shopify ES MUY ESTRICTO con esto para APPS PÚBLICAS en producción.
              // Es muy probable que este comodín cause que tu aplicación sea RECHAZADA
              // en el proceso de revisión final, ya que Shopify exige un dominio de tienda exacto.
              frame-ancestors https://admin.shopify.com https://*.myshopify.com;
              
              img-src 'self' data: blob: https://cdn.shopify.com https://*.clerk.accounts.dev https://*.clerk.com;
              style-src 'self' 'unsafe-inline'; // 'unsafe-inline' puede ser necesario para estilos inyectados por JS
              font-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              block-all-mixed-content;
              upgrade-insecure-requests;
              worker-src blob:; // Necesario para Web Workers de Clerk u otras librerías
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
          // La cabecera X-Frame-Options ha sido eliminada previamente según lo discutido
        ],
      },
    ];
  },
};

export default nextConfig;