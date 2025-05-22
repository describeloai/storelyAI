import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const shop = searchParams.get('shop');
  const host = searchParams.get('host'); // aunque no se usa directamente, lo podrías guardar si lo deseas

  if (!shop || !shop.endsWith('.myshopify.com')) {
    return NextResponse.json(
      { error: 'Falta o formato inválido del parámetro "shop"' },
      { status: 400 }
    );
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/shopify/callback`;
  const scopes = process.env.SHOPIFY_SCOPES || 'read_products';
  const state = Math.random().toString(36).substring(2); // podrías guardarlo en sessionStorage/server para validarlo luego

  const authUrl = new URL(`https://${shop}/admin/oauth/authorize`);
  authUrl.searchParams.set('client_id', process.env.SHOPIFY_API_KEY!);
  authUrl.searchParams.set('scope', scopes);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('state', state); // opcional pero recomendado

  console.log('🔁 Redirigiendo al flujo OAuth:', authUrl.toString());

  return NextResponse.redirect(authUrl.toString());
}
