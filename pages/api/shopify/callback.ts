// pages/api/shopify/callback.ts
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shop, code } = req.query;

  if (!shop || !code || typeof shop !== 'string' || typeof code !== 'string') {
    console.warn('Faltan parámetros en callback:', { shop, code });
    return res.status(400).send('Faltan parámetros');
  }

  try {
    // Llamada al endpoint oficial de Shopify para obtener el access_token
    const tokenResponse = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: process.env.SHOPIFY_API_KEY,
      client_secret: process.env.SHOPIFY_API_SECRET,
      code,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const accessToken = tokenResponse.data.access_token;

    // Guardar en cookies temporales (visibles desde el cliente solo si httpOnly: false)
    res.setHeader('Set-Cookie', [
      serialize('shopifyShop', shop, {
        path: '/',
        maxAge: 300,
        httpOnly: false,
      }),
      serialize('shopifyToken', accessToken, {
        path: '/',
        maxAge: 300,
        httpOnly: false,
      }),
    ]);

    console.log('🔐 Shopify Access Token recibido y cookies establecidas');
    return res.redirect('/dashboard/conexion');

  } catch (error) {
    const err = error as any;
    console.error('❌ Error en Shopify callback:', {
      message: err?.message,
      status: err?.response?.status,
      responseData: err?.response?.data,
    });
    return res.status(500).send('Error conectando con Shopify');
  }
}
