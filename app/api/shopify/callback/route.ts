// @ts-ignore
import { registerShopifyWebhooks } from '@/lib/shopify/registerShopifyWebhooks';
import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const shop = searchParams.get('shop');
  const code = searchParams.get('code');
  const host = searchParams.get('host'); // ✅ CLAVE PARA APP BRIDGE

  console.log('🧭 CALLBACK PARAMS:', { shop, code, host });

  // 🔒 Validar parámetros esenciales
  if (!shop || !code || !host) {
    console.error('❌ Faltan parámetros en el callback', { shop, code, host });
    return NextResponse.json({ error: 'Faltan parámetros en la URL' }, { status: 400 });
  }

  try {
    // 🔑 Intercambiar code por access_token
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
//@ts-ignore
    const { userId } = auth();
    if (!userId) {
      console.error('⚠️ Usuario no autenticado con Clerk');
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`);
    }

    // 📝 Guardar token y tienda en Clerk
    //@ts-ignore
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: { shop, accessToken },
    });

    // 🔔 Registrar Webhooks (opcional)
    await registerShopifyWebhooks(shop, accessToken);

    // ✅ Redirigir al dashboard con `host` (ESENCIAL)
    const redirectUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);
    redirectUrl.searchParams.set('shop', shop);
    redirectUrl.searchParams.set('host', host); // 👈 CLAVE
    redirectUrl.searchParams.set('embedded', '1');

    console.log('🚀 Redirigiendo a:', redirectUrl.toString());

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('❌ Error en Shopify callback:', error);
    return NextResponse.json({ error: 'Error en callback' }, { status: 500 });
  }
}
