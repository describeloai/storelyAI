// app/api/shopify/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const shop = req.nextUrl.searchParams.get('shop');
  const host = req.nextUrl.searchParams.get('host');
  const isEmbedded = req.nextUrl.searchParams.get('embedded') === '1';

  if (!shop || !shop.endsWith('.myshopify.com')) {
    return NextResponse.json({ error: 'Parámetro "shop" inválido' }, { status: 400 });
  }

  if (isEmbedded && host) {
    // 🔁 Este enlace carga la app dentro del Admin de Shopify
    const redirectUrl = `https://admin.shopify.com/store/${shop.replace('.myshopify.com', '')}/apps/${process.env.NEXT_PUBLIC_SHOPIFY_API_KEY}?shop=${shop}&host=${host}`;
    return NextResponse.redirect(redirectUrl);
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/shopify/callback`;
  const scopes = process.env.SHOPIFY_SCOPES || 'read_products';

  const authUrl = new URL(`https://${shop}/admin/oauth/authorize`);
  authUrl.searchParams.set('client_id', process.env.SHOPIFY_API_KEY!);
  authUrl.searchParams.set('scope', scopes);
  authUrl.searchParams.set('redirect_uri', redirectUri);

  return NextResponse.redirect(authUrl.toString());
}
