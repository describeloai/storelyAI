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
//@ts-ignore
    const { userId } = auth();
    if (!userId) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`);
    }
//@ts-ignore
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        shop,
        accessToken,
      },
    });

    const redirectTo = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);
    redirectTo.searchParams.set('shop', shop);
    redirectTo.searchParams.set('host', host);
    redirectTo.searchParams.set('embedded', '1');

    return NextResponse.redirect(redirectTo);
  } catch (error) {
    console.error('Error al intercambiar token:', error);
    return NextResponse.json({ error: 'Error en callback' }, { status: 500 });
  }
}
