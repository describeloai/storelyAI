// pages/api/shopify/callback.ts
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shop, code } = req.query;

  if (!shop || !code || typeof shop !== 'string' || typeof code !== 'string') {
    return res.status(400).send('Faltan parámetros');
  }

  try {
    const tokenResponse = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // 🔁 Redirige al frontend con los datos como query params
    return res.redirect(
      `/dashboard/conexion?shop=${encodeURIComponent(shop)}&token=${accessToken}`
    );
  } catch (error) {
    console.error('❌ Error en callback:', error);
    return res.status(500).send('Error conectando con Shopify');
  }
}
