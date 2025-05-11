import { clerkClient, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    // @ts-ignore
  const { userId } = getAuth(req); // ✅ Esto sí funciona sin middleware

  console.log('🧠 userId detectado:', userId);

  if (!userId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

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
}
