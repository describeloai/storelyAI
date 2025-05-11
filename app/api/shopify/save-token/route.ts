import { clerkClient } from '@clerk/nextjs/server';
import { verifyToken } from '@clerk/backend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  console.log('🔍 Token recibido:', token);

  if (!token) {
    return NextResponse.json({ error: 'Token no proporcionado' }, { status: 401 });
  }

  try {
    const verified = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    console.log('✅ Payload:', verified?.payload);

    if (!verified || typeof verified !== 'object' || !('payload' in verified)) {
      return NextResponse.json({ error: 'Token inválido o sin payload' }, { status: 401 });
    }

    const userId = (verified.payload as any).sub;

    const { shop, accessToken } = await req.json();

    if (
      typeof shop !== 'string' ||
      typeof accessToken !== 'string' ||
      shop.length < 5 ||
      accessToken.length < 10
    ) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    // @ts-ignore
    await clerkClient.users.updateUser(userId, {
      privateMetadata: { shop, accessToken },
    });

    console.log(`✅ Shopify conectado para usuario ${userId}`);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('❌ Error en verifyToken:', err.message);
    return NextResponse.json({ error: 'Error al autenticar' }, { status: 500 });
  }
}
