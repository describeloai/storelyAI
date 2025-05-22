import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
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
    // 1. Obtener el accessToken desde Shopify
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

    // 2. Obtener el usuario actual de Clerk
    // @ts-ignore
    const { userId } = auth();
    if (!userId) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`);
    }

    // 3. Guardar en privateMetadata
    // @ts-ignore
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        shop,
        accessToken,
      },
    });

    // 4. Redirigir correctamente
    const redirect = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/redirect-entry`);
    redirect.searchParams.set('shop', shop);
    redirect.searchParams.set('host', host);
    redirect.searchParams.set('redirectTo', '/dashboard');

    return NextResponse.redirect(redirect);
  } catch (error) {
    console.error('❌ Error en callback:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/error`);
  }
}
