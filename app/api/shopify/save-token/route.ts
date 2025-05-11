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

    const userId = (payload as any).sub;

    const { shop, accessToken } = await req.json();

    if (
      typeof shop !== 'string' ||
      typeof accessToken !== 'string' ||
      shop.length < 5 ||
      accessToken.length < 10
    ) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    // @ts-ignore: updateUser está funcionando aunque Clerk no lo tipa bien
    await clerkClient.users.updateUser(userId, {
      privateMetadata: { shop, accessToken },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('❌ Verificación fallida o error al guardar:', err.message);
    return NextResponse.json({ error: 'Error de autenticación o servidor' }, { status: 500 });
  }
}
