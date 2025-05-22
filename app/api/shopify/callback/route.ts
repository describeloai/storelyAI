import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';
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
    // 1. Intercambiar code por access token
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
    console.log('🔑 Access Token:', accessToken);

    // 2. Obtener userId
    //@ts-ignore
    const { userId } = auth();
    console.log('👤 userId:', userId);

    if (!userId) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`);
    }

    // 3. Guardar en Clerk con fallback
    try {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          shop,
          accessToken,
        },
      });
      console.log('✅ Metadata guardada con clerkClient');
    } catch (err) {
      console.warn('⚠️ clerkClient falló, usando fetch como fallback...');

      const res = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          private_metadata: {
            shop,
            accessToken,
          },
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('❌ Fallback fetch error:', text);
        return NextResponse.json({ error: 'Error guardando metadata en Clerk' }, { status: 500 });
      }

      console.log('✅ Metadata guardada vía fetch');
    }

    // 4. Redirigir
    const redirect = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/redirect-entry`);
    redirect.searchParams.set('shop', shop);
    redirect.searchParams.set('host', host);
    redirect.searchParams.set('redirectTo', '/dashboard');

    return NextResponse.redirect(redirect);
  } catch (error) {
    console.error('❌ Callback general error:', error);
    return NextResponse.json({ error: 'Callback error' }, { status: 500 });
  }
}
