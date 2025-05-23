// app/api/shopify/auth/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const shop = req.nextUrl.searchParams.get('shop');

  if (!shop || !shop.endsWith('.myshopify.com')) {
    return NextResponse.json({ error: 'Parámetro "shop" inválido' }, { status: 400 });
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/shopify/callback`;
  const scopes = process.env.SHOPIFY_SCOPES || 'read_products,write_products';

  const authUrl = new URL(`https://${shop}/admin/oauth/authorize`);
  authUrl.searchParams.set('client_id', process.env.SHOPIFY_API_KEY!);
  authUrl.searchParams.set('scope', scopes);
  authUrl.searchParams.set('redirect_uri', redirectUri);

  return NextResponse.redirect(authUrl.toString());
}
