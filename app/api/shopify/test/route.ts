import { NextRequest, NextResponse } from 'next/server';
import { getAuth, clerkClient } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  // ✅ (Opcional) Obtener detalles del usuario
  // @ts-ignore
  const user = await clerkClient.users.getUser(userId);

  return NextResponse.json({
    message: 'Autenticado correctamente',
    userId,
    email: user.emailAddresses?.[0]?.emailAddress,
    privateMetadata: user.privateMetadata,
  });
}
