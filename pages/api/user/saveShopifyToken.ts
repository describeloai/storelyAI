// pages/api/user/saveShopifyToken.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { userId, shop, accessToken } = req.body;

  if (!userId || !shop || !accessToken) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    await axios.patch(
      `https://api.clerk.com/v1/users/${userId}/metadata`,
      {
        private_metadata: {
          shopifyShop: shop,
          shopifyAccessToken: accessToken,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error al guardar token en Clerk:', err);
    return res.status(500).json({ error: 'No se pudo guardar el token' });
  }
}
