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
    const response = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const accessToken = response.data.access_token;

    // ✅ Redirige a la raíz embebida de tu app con los parámetros que Shopify espera
    const redirectUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
    redirectUrl.searchParams.set('shop', shop);
    redirectUrl.searchParams.set('host', host);
    redirectUrl.searchParams.set('embedded', '1');

    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('❌ Callback error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/error`);
  }
}
