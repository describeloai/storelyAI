export const runtime = "nodejs";

import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

// @ts-ignore
export async function POST(req: NextRequest) {
  // @ts-ignore
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { shop, accessToken } = body;

  if (
    typeof shop !== 'string' ||
    typeof accessToken !== 'string' ||
    shop.length < 5 ||
    accessToken.length < 10
  ) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  try {
    // @ts-ignore
    await clerkClient.users.updateUser(userId, {
      privateMetadata: {
        shop,
        accessToken,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('❌ Error al guardar token en Clerk:', err.message);
    return NextResponse.json({ error: 'Error al guardar token' }, { status: 500 });
  }
}
