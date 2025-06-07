import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const shop = searchParams.get('shop');
  const code = searchParams.get('code');
  const host = searchParams.get('host');

  if (!shop || !code || !host) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/error`);
  }

  try {
    // Intercambiar el código de autorización por un access token
    const response = await axios.post(
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

    const accessToken = response.data.access_token;

    // Aquí podrías guardar el accessToken si lo deseas (en DB por tienda)

    // ✅ Redirigir al entorno embebido oficial de Shopify
    const redirectUrl = `https://admin.shopify.com/store/${shop.replace(
      '.myshopify.com',
      ''
    )}/apps/${process.env.NEXT_PUBLIC_SHOPIFY_API_KEY}?shop=${shop}&host=${host}`;

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('❌ Error en el callback OAuth:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/error`);
  }
}
