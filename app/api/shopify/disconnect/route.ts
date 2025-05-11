import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST() {
  const authData = await auth();
  if (!authData.userId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const userId = authData.userId;

  try {
    // @ts-ignore: clerkClient.users funciona correctamente aunque no esté tipado explícitamente
    await clerkClient.users.updateUser(userId, {
      privateMetadata: {
        shop: null,
        accessToken: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('❌ Error al desconectar Shopify:', err.message);
    return NextResponse.json({ error: 'Error al desconectar' }, { status: 500 });
  }
}
