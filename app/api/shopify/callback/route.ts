import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const shop = req.nextUrl.searchParams.get('shop');
  const code = req.nextUrl.searchParams.get('code');

  if (!shop || !code || typeof shop !== 'string' || typeof code !== 'string') {
    return new NextResponse('Faltan parámetros', { status: 400 });
  }

  try {
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Token request failed');
    }

    const data = await tokenResponse.json();
    const accessToken = data.access_token;

    const redirectUrl = `${process.env.SHOPIFY_APP_URL}/dashboard/conexion?shop=${encodeURIComponent(shop)}&token=${accessToken}`;
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('❌ Error en callback:', error);
    return new NextResponse('Error conectando con Shopify', { status: 500 });
  }
}
