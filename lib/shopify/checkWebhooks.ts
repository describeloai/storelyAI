import axios from 'axios';

export async function checkShopifyWebhooks(shop: string, accessToken: string) {
  try {
    const res = await axios.get(`https://${shop}/admin/api/2024-01/webhooks.json`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
      },
    });

    const webhooks = res.data.webhooks || [];
    console.log('🧾 Webhooks registrados en la tienda:', shop);
    webhooks.forEach((wh: any) => {
      console.log(`📌 ${wh.topic} → ${wh.address}`);
    });
  } catch (err) {
    console.error('❌ Error consultando webhooks:', err);
  }
}
