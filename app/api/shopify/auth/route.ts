import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const shop = searchParams.get('shop');
  const host = searchParams.get('host');

  if (!shop || !shop.endsWith('.myshopify.com')) {
    return NextResponse.json(
      { error: 'Falta o formato inválido del parámetro "shop"' },
      { status: 400 }
    );
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/shopify/callback`;

  const scopes = process.env.SHOPIFY_SCOPES || 'read_products';

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  console.log('🔁 Redirigiendo al flujo OAuth:', authUrl);

  return NextResponse.redirect(authUrl);
}
