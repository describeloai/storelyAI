import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL', // 🔓 Permite que Shopify embeba la app
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' https://cdn.shopify.com https://*.clerk.accounts.dev https://*.clerk.com;
              connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com;
              frame-src 'self' https://*.clerk.accounts.dev https://*.clerk.com;
              frame-ancestors https://admin.shopify.com https://*.myshopify.com;
              img-src 'self' data: blob: https://cdn.shopify.com https://*.clerk.accounts.dev https://*.clerk.com;
              style-src 'self' 'unsafe-inline';
              font-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              block-all-mixed-content;
              upgrade-insecure-requests;
              worker-src blob:;
            `.replace(/\s+/g, ' ').trim(),
          },
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
