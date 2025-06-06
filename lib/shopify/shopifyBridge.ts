// lib/shopify/shopifyBridge.ts (usando CDN oficial de Shopify sin instalar nada)

declare global {
  interface Window {
    Shopify?: any;
    ShopifyApp?: any;
    app?: any;
    ['app-bridge']?: any;
  }
}

interface InitOptions {
  host: string;
  shop: string;
}

let app: any = null;

export function loadShopifyBridge({ apiKey, host }: { apiKey: string; host: string }) {
  if (typeof window === 'undefined') return;

  if (window.Shopify && window.Shopify.App) return;

  // Registrar globalmente usando la CDN de Shopify App Bridge
  window.ShopifyApp = window['ShopifyApp'] = window['app-bridge'] = window.app = {
    apiKey,
    host,
    forceRedirect: true,
  };
}
