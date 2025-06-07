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
    // Intercambiar el código por el access token
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

    // (Opcional) Aquí podrías guardar el token en base de datos

    // ✅ Redirigir a tu propia app embebida
    const redirectUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/embedded`);
    redirectUrl.searchParams.set('shop', shop);
    redirectUrl.searchParams.set('host', host);
    redirectUrl.searchParams.set('embedded', '1');

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('❌ Error en callback OAuth:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/error`);
  }
}
