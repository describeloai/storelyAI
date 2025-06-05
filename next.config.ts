// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... otras configuraciones
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Asegúrate de que esta cadena NO tenga comentarios // y que no haya saltos de línea inesperados
            // aunque el .replace() debería ayudar, a veces los comentarios internos causan problemas.
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.shopify.com https://*.clerk.accounts.dev https://*.clerk.com; connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com; frame-src 'self' https://*.clerk.accounts.dev https://*.clerk.com; frame-ancestors https://admin.shopify.com https://*.myshopify.com; img-src 'self' data: blob: https://cdn.shopify.com https://*.clerk.accounts.dev https://*.clerk.com; style-src 'self' 'unsafe-inline'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; block-all-mixed-content; upgrade-insecure-requests;`.replace(/\s+/g, ' ').trim(),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // La cabecera X-Frame-Options ha sido eliminada según lo discutido
        ],
      },
    ];
  },
};

export default nextConfig;