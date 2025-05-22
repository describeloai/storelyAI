// app/api/shopify/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const shop = searchParams.get('shop');
  const code = searchParams.get('code');
  const host = searchParams.get('host');

  if (!shop || !code || !host) {
    return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
  }

  try {
    // 1. Obtener accessToken de Shopify
    const tokenRes = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const accessToken = tokenRes.data.access_token;

    // 2. Obtener usuario actual
    //@ts-ignore
    const { userId } = auth();
    if (!userId) {
      console.error('❌ Usuario no autenticado en Clerk');
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`);
    }

    // 3. Guardar datos en Clerk
    //@ts-ignore
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        shop,
        accessToken,
      },
    });

    // 4. Redirigir al dashboard embebido
    const redirect = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/redirect-entry`);
    redirect.searchParams.set('shop', shop);
    redirect.searchParams.set('host', host);
    redirect.searchParams.set('redirectTo', '/dashboard');

    return NextResponse.redirect(redirect);
  } catch (error) {
    console.error('❌ Error en callback:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
