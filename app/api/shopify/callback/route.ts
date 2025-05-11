import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const shop = searchParams.get('shop');
  const code = searchParams.get('code');

  if (!shop || !code) {
    return new Response('Faltan parámetros', { status: 400 });
  }

  try {
    const tokenResponse = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const redirectUrl = `/dashboard/conexion?shop=${encodeURIComponent(
      shop
    )}&token=${accessToken}`;

    return NextResponse.redirect(new URL(redirectUrl, process.env.NEXT_PUBLIC_BASE_URL));
  } catch (error: any) {
    console.error('❌ [callback] Error obteniendo access token:', error.message);
    return new Response('Error conectando con Shopify', { status: 500 });
  }
}
