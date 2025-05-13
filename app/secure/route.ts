// app/api/secure/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Falta token' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.SHOPIFY_API_SECRET!);
    return NextResponse.json({ message: '✅ Token válido', payload: decoded });
  } catch (err) {
    return NextResponse.json({ error: '❌ Token inválido' }, { status: 401 });
  }
}
