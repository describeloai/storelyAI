import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  console.log('🔍 [save-token] Token recibido:', token);

  if (!token) {
    return NextResponse.json({ error: 'Token no proporcionado' }, { status: 401 });
  }

  // ✅ Validamos el token contra Clerk directamente (remotamente)
  const clerkRes = await fetch('https://api.clerk.dev/v1/sessions/me', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Clerk-Secret-Key': process.env.CLERK_SECRET_KEY!,
    },
  });

  if (!clerkRes.ok) {
    return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 });
  }

  const session = await clerkRes.json();
  const userId = session.user_id;

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

  console.log(`✅ [save-token] Shopify conectado para usuario ${userId}`);
  return NextResponse.json({ success: true });
}
