// @ts-ignore
import { registerShopifyWebhooks } from '@/lib/shopify/registerShopifyWebhooks';
import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const shop = searchParams.get('shop');
  const code = searchParams.get('code');

  if (!shop || !code) {
    return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
  }

  try {
    const tokenResponse = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const accessToken = tokenResponse.data.access_token;

    // @ts-ignore
    const { userId } = auth();
    if (!userId) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`);
    }

    // @ts-ignore
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: { shop, accessToken },
    });

    await registerShopifyWebhooks(shop, accessToken);

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);
  } catch (error) {
    console.error('❌ Error en Shopify callback:', error);
    return NextResponse.json({ error: 'Error en callback' }, { status: 500 });
  }
}
