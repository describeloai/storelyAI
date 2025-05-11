import { clerkClient } from '@clerk/nextjs/server';
import { verifyToken } from '@clerk/backend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  console.log('🔍 [disconnect] Token recibido:', token);

  if (!token) {
    return NextResponse.json({ error: 'Token no proporcionado' }, { status: 401 });
  }

  try {
    const verified = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    console.log('✅ [disconnect] Payload:', verified?.payload);

    if (!verified || typeof verified !== 'object' || !('payload' in verified)) {
      return NextResponse.json({ error: 'Token inválido o sin payload' }, { status: 401 });
    }

    const userId = (verified.payload as any).sub;

    // @ts-ignore: updateUser funciona aunque Clerk no lo tipa perfectamente
    await clerkClient.users.updateUser(userId, {
      privateMetadata: {
        shop: null,
        accessToken: null,
      },
    });

    console.log(`✅ [disconnect] Shopify desconectado para usuario ${userId}`);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('❌ [disconnect] Error en verificación o Clerk:', err.message);
    return NextResponse.json({ error: 'Error al desconectar Shopify' }, { status: 500 });
  }
}

