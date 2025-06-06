// shopifyBridge.ts (cliente, usando CDN App Bridge sin instalar nada manual)

import { createApp } from '@shopify/app-bridge';
import { getSessionToken } from '@shopify/app-bridge-utils';

interface InitOptions {
  host: string;
  shop: string;
}

let app: ReturnType<typeof createApp> | null = null;

export function loadShopifyBridge({ apiKey, host }: { apiKey: string; host: string }) {
  if (typeof window === 'undefined') return;

  if (window.Shopify && window.Shopify.App) return;

  // @ts-ignore
  window.app = window['app-bridge'] = window['ShopifyApp'] = window['ShopifyApp'] || {};

  // @ts-ignore
  window.ShopifyApp = window.app = window['app-bridge'] = {
    apiKey,
    host,
    forceRedirect: true,
  };
}