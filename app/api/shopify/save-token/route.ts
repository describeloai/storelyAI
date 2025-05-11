import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const authData = await auth();
  if (!authData.userId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const userId = authData.userId as string;
  const { shop, accessToken } = await req.json();

  if (
    typeof shop !== 'string' ||
    typeof accessToken !== 'string' ||
    shop.length < 5 ||
    accessToken.length < 10
  ) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  try {
    // @ts-ignore: clerkClient.users.updateUser funciona correctamente aunque los tipos no estén bien definidos
    await clerkClient.users.updateUser(userId, {
      privateMetadata: { shop, accessToken },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('❌ Error al guardar token:', err.message);
    return NextResponse.json({ error: 'Error al guardar token' }, { status: 500 });
  }
}
