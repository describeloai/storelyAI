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

    // Redirige con shop y token a una página cliente
   const redirectUrl = new URL(`https://admin.shopify.com/store/${shop.replace('.myshopify.com', '')}/app/grant`);
return NextResponse.redirect(redirectUrl.toString());

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('❌ Callback error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/error`);
  }
}
