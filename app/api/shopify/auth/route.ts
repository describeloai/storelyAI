import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const shop = req.nextUrl.searchParams.get('shop');

  if (!shop || !shop.endsWith('.myshopify.com')) {
    return NextResponse.json(
      { error: 'Falta o formato inválido del parámetro "shop"' },
      { status: 400 }
    );
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/shopify/callback`;

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SHOPIFY_SCOPES}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return NextResponse.redirect(authUrl);
}
