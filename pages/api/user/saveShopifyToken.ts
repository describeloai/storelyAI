import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Solo permite POST
  if (req.method !== 'POST') return res.status(405).end();

  // Obtiene userId desde Clerk usando getAuth (seguro y sin pasarlo desde el frontend)
  const { userId } = getAuth(req);
  const { shop, accessToken } = req.body;

  if (!userId || !shop || !accessToken) {
    return res.status(400).json({ error: '❌ Datos incompletos para guardar en Clerk' });
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
    console.error('❌ Error al guardar en Clerk:', err);
    return res.status(500).json({ error: 'No se pudo guardar el token en Clerk' });
  }
}
