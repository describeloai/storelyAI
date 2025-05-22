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
    // Intercambiar el código por un access token
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

    // Obtener el userId del usuario actual (Clerk)
    // @ts-ignore
    const { userId } = auth();

    if (userId) {
      // Guardar datos en Clerk
      // @ts-ignore
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          shop,
          accessToken,
        },
      });

      // Registrar webhooks
      await registerShopifyWebhooks(shop, accessToken);
    } else {
      console.warn('⚠️ Usuario no autenticado todavía. Clerk se gestionará en el client.');
    }

    // Redirigir al flujo embebido con contexto
    const base = process.env.NEXT_PUBLIC_BASE_URL;

    if (!base) {
      console.error('❌ Faltante: NEXT_PUBLIC_BASE_URL no definido');
      return NextResponse.json({ error: 'Configuración incompleta del entorno' }, { status: 500 });
    }

    const safeRedirectUrl = new URL('/redirect-entry', base);
    safeRedirectUrl.searchParams.set('shop', shop);
    safeRedirectUrl.searchParams.set('host', host);
    safeRedirectUrl.searchParams.set('redirectTo', '/dashboard');

    console.log('🚀 Redirigiendo al dashboard embebido vía /redirect-entry:', safeRedirectUrl.toString());

    return NextResponse.redirect(safeRedirectUrl);
  } catch (error) {
    console.error('❌ Error en Shopify callback:', error);
    return NextResponse.json({ error: 'Error en callback' }, { status: 500 });
  }
}
