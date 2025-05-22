import { NextResponse } from 'next/server';
import { jwtVerify, importSPKI } from 'jose';

export async function POST(req: Request) {
  try {
    // 🔐 Validación del header de autenticación
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado: faltan headers Bearer' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // 📦 Parseo del body
    const { shop, accessToken } = await req.json();
    if (!shop || !accessToken) {
      return NextResponse.json({ error: 'Faltan datos en el body (shop o accessToken)' }, { status: 400 });
    }

    // 🔑 Importar la clave pública y verificar el JWT
    const publicKey = await importSPKI(process.env.CLERK_JWT_PUBLIC_KEY!, 'RS256');

    let payload;
    try {
      ({ payload } = await jwtVerify(token, publicKey, { algorithms: ['RS256'] }));
    } catch (err) {
      console.error('❌ Error al verificar JWT:', err);
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const userId = payload.sub;
    if (!userId) {
      return NextResponse.json({ error: 'No se pudo extraer userId del token' }, { status: 401 });
    }

    // 📤 Guardar en Clerk
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
      console.error(`❌ Clerk API Error [${updateRes.status}]:`, errorDetail);
      return NextResponse.json(
        { error: 'Error al guardar en Clerk', detail: errorDetail },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error general en /api/shopify/save-token:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
