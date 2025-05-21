// @ts-ignore
import { registerShopifyWebhooks } from '@/lib/shopify/registerShopifyWebhooks';
import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const shop = searchParams.get('shop');
  const code = searchParams.get('code');
  const host = searchParams.get('host');

  console.log('🧭 CALLBACK PARAMS:', { shop, code, host });

  if (!shop || !code || !host) {
    console.error('❌ Faltan parámetros en el callback', { shop, code, host });
    return NextResponse.json({ error: 'Faltan parámetros en la URL' }, { status: 400 });
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
    console.log('🔐 Access token obtenido:', accessToken);

    // @ts-ignore
    const { userId } = auth();
    if (!userId) {
      console.error('⚠️ Usuario no autenticado con Clerk');
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`);
    }

    // Guardar en Clerk
    // @ts-ignore
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: { shop, accessToken },
    });

    // Registrar webhooks opcional
    await registerShopifyWebhooks(shop, accessToken);

    // ✅ Redirigir correctamente al flujo embebido
    const safeRedirectUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/redirect-entry`);
    safeRedirectUrl.searchParams.set('shop', shop);
    safeRedirectUrl.searchParams.set('host', host);
    safeRedirectUrl.searchParams.set('redirectTo', '/dashboard');

    console.log('🚀 Redirigiendo al dashboard embebido vía /api/redirect-entry:', safeRedirectUrl.toString());

    return NextResponse.redirect(safeRedirectUrl);
  } catch (error) {
    console.error('❌ Error en Shopify callback:', error);
    return NextResponse.json({ error: 'Error en callback' }, { status: 500 });
  }
}
