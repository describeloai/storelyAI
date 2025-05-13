// lib/shopify/webhooks.ts
export async function registerShopifyWebhooks(shop: string, accessToken: string) {
  const topics = [
    'customers/data_request',
    'customers/redact',
    'shop/redact',
  ];

  for (const topic of topics) {
    const response = await fetch(`https://${shop}/admin/api/2024-01/webhooks.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify({
        webhook: {
          topic,
          address: `https://storelyai.vercel.app/api/shopify/webhooks`,
          format: 'json',
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ Error al registrar webhook para ${topic}:`, error);
    } else {
      console.log(`✅ Webhook registrado para ${topic}`);
    }
  }
}
