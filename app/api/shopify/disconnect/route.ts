import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST() {
    // @ts-ignore
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // @ts-ignore
    await clerkClient.users.updateUser(userId, {
      privateMetadata: {
        shop: null,
        accessToken: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al desconectar Shopify:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
