import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Token no proporcionado' }, { status: 401 });
  }

  // Aquí podrías verificar el token si quieres (aún no es obligatorio)
  return NextResponse.json({ message: 'Token recibido correctamente', token });
}
