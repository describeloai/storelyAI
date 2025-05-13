import axios from 'axios';

export async function registerShopifyWebhooks(shop: string, accessToken: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const webhooks = [
    {
      topic: 'customers/data_request',
      address: `${baseUrl}/api/shopify/webhooks`,
    },
    {
      topic: 'customers/redact',
      address: `${baseUrl}/api/shopify/webhooks`,
    },
    {
      topic: 'shop/redact',
      address: `${baseUrl}/api/shopify/webhooks`,
    },
  ];

  try {
    for (const webhook of webhooks) {
      await axios.post(`https://${shop}/admin/api/2024-01/webhooks.json`, {
        webhook: {
          topic: webhook.topic,
          address: webhook.address,
          format: 'json',
        },
      }, {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      });
    }

    console.log('✅ Webhooks registrados correctamente.');
  } catch (error) {
    console.error('❌ Error al registrar webhooks:', error);
  }
}
