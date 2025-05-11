import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  let decoded: any;

  try {
    decoded = jwt.verify(token, process.env.CLERK_JWT_PUBLIC_KEY!, {
      algorithms: ['RS256'],
    });
  } catch (error) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  const userId = decoded.sub;

  const res = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      private_metadata: {
        shop: null,
        accessToken: null,
      },
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Error al desconectar tienda' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
