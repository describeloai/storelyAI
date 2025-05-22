import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, importSPKI } from 'jose';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const { shop, accessToken } = await req.json();

    const publicKey = await importSPKI(process.env.CLERK_JWT_PUBLIC_KEY!, 'RS256');
    const { payload } = await jwtVerify(token, publicKey, { algorithms: ['RS256'] });
    const userId = payload.sub;

    if (!userId) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const res = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        private_metadata: {
          shop,
          accessToken,
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'Error al guardar en Clerk', detail: text }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Error general:', err);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
