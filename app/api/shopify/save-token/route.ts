import { NextResponse } from 'next/server';
import { jwtVerify, importSPKI } from 'jose';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado: faltan headers' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const { shop, accessToken } = await req.json();

    if (!shop || !accessToken) {
      return NextResponse.json({ error: 'Faltan datos en el body' }, { status: 400 });
    }

    // ✅ Importar la clave pública como CryptoKey (formato SPKI)
    const publicKey = await importSPKI(process.env.CLERK_JWT_PUBLIC_KEY!, 'RS256');

    const { payload } = await jwtVerify(token, publicKey, {
      algorithms: ['RS256'],
    });

    const userId = payload.sub;
    if (!userId) {
      return NextResponse.json({ error: 'No se pudo extraer userId del token' }, { status: 401 });
    }

    // ✅ Guardar en Clerk
    const updateRes = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
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

    if (!updateRes.ok) {
      const errorDetail = await updateRes.text();
      console.error('❌ Error al guardar en Clerk:', errorDetail);
      return NextResponse.json({ error: 'Error al guardar en Clerk', detail: errorDetail }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error general en /api/shopify/save-token:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
