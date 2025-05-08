// /api/shopify/callback.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shop, code } = req.query

  if (!shop || !code || typeof shop !== 'string' || typeof code !== 'string') {
    return res.status(400).send('Missing shop or code')
  }

  try {
    const accessTokenResponse = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: process.env.SHOPIFY_API_KEY,
      client_secret: process.env.SHOPIFY_API_SECRET,
      code,
    })

    const accessToken = accessTokenResponse.data.access_token

    // 🔐 Aquí puedes guardar el token en Clerk metadata si estás autenticado
    // O simplemente responderlo por ahora (solo para desarrollo)
    return res.status(200).json({
      success: true,
      shop,
      accessToken,
    })
  } catch (error) {
    console.error('Error obteniendo el token de Shopify:', error)
    return res.status(500).json({ error: 'Error al obtener el token de acceso' })
  }
}
