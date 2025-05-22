import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const shop = searchParams.get('shop');
  const code = searchParams.get('code');
  const host = searchParams.get('host');

  if (!shop || !code || !host) {
    console.error('❌ Faltan parámetros:', { shop, code, host });
    return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
  }

  try {
    // 1. Intercambiar code por token
    const tokenResponse = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    console.log('🔐 Access Token:', accessToken);

    // 2. Obtener ID de usuario Clerk
    //@ts-ignore
    const { userId } = auth();
    if (!userId) {
      console.error('❌ Usuario no autenticado con Clerk');
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`);
    }

    console.log('👤 userId Clerk:', userId);

    // 3. Guardar shop y accessToken en Clerk
    try {
      //@ts-ignore
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          shop,
          accessToken,
        },
      });
      console.log('✅ Metadata guardada en Clerk');
    } catch (err) {
      console.error('❌ Error guardando metadata en Clerk:', err);
    }

    // 4. Redirigir al dashboard embebido
    const redirect = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/redirect-entry`);
    redirect.searchParams.set('shop', shop);
    redirect.searchParams.set('host', host);
    redirect.searchParams.set('redirectTo', '/dashboard');

    console.log('🔁 Redirigiendo a:', redirect.toString());

    return NextResponse.redirect(redirect);
  } catch (error) {
    console.error('❌ Error en callback:', error);
    return NextResponse.json({ error: 'Error en callback' }, { status: 500 });
  }
}
