// /api/shopify/auth.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shop } = req.query

  if (!shop || typeof shop !== 'string') {
    return res.status(400).send('Missing shop parameter')
  }

  const redirectUri = `${process.env.SHOPIFY_APP_URL}/api/shopify/callback`
  const installUrl = `https://${shop}/admin/oauth/authorize` +
    `?client_id=${process.env.SHOPIFY_API_KEY}` +
    `&scope=${process.env.SHOPIFY_SCOPES}` +
    `&redirect_uri=${redirectUri}`

  return res.redirect(installUrl)
}
