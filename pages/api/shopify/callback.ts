// pages/api/shopify/callback.ts
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shop, code } = req.query;

  if (!shop || !code || typeof shop !== 'string' || typeof code !== 'string') {
    return res.status(400).send('Faltan parámetros');
  }

  try {
    const result = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: process.env.SHOPIFY_API_KEY,
      client_secret: process.env.SHOPIFY_API_SECRET,
      code,
    });

    const { access_token } = result.data;

    // Guardar en cookie temporal (httpOnly = false para que sea accesible desde el cliente)
    res.setHeader('Set-Cookie', [
      serialize('shopifyShop', shop, { path: '/', maxAge: 300 }),
      serialize('shopifyToken', access_token, { path: '/', maxAge: 300 }),
    ]);

    // Redirigir a página que completará el guardado en Clerk desde el frontend
    res.redirect('/dashboard/conexion');
  } catch (error) {
    console.error('Error en Shopify callback:', error);
    res.status(500).send('Error conectando con Shopify');
  }
}
