// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... otras configuraciones si las tienes ...

  async headers() {
    return [
      {
        source: '/:path*', // Aplica estas cabeceras a todas las rutas
        headers: [
          {
            key: 'Content-Security-Policy',
            // ¡ESTA ES LA CADENA CSP LIMPIA! Cópiala EXACTAMENTE así.
            // No debe tener NINGÚN comentario interno (// o /* */) ni saltos de línea adicionales.
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.shopify.com https://*.clerk.accounts.dev https://*.clerk.com; connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com; frame-src 'self' https://*.clerk.accounts.dev https://*.clerk.com; frame-ancestors https://admin.shopify.com https://*.myshopify.com; img-src 'self' data: blob: https://cdn.shopify.com https://*.clerk.accounts.dev https://*.clerk.com; style-src 'self' 'unsafe-inline'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; block-all-mixed-content; upgrade-insecure-requests; worker-src blob:;`.replace(/\s+/g, ' ').trim(),
          },
          // --- Otras cabeceras de seguridad ---
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;