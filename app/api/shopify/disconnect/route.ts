import { clerkClient } from '@clerk/nextjs/server';
import { verifyToken } from '@clerk/backend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { payload } = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });
// @ts-ignore: el tipo real de verified sí tiene payload.sub pero TypeScript no lo reconoce
    const userId = payload.sub;

    // @ts-ignore: updateUser funciona aunque Clerk no tipa bien esta API aún
    await clerkClient.users.updateUser(userId, {
      privateMetadata: {
        shop: null,
        accessToken: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('❌ Error al desconectar Shopify:', err.message);
    return NextResponse.json({ error: 'Error de autenticación o servidor' }, { status: 500 });
  }
}
