import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const host = searchParams.get('host');
  const shop = searchParams.get('shop');
  const redirectTo = searchParams.get('redirectTo');

  // Validar parámetros obligatorios
  if (!host || !shop) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Verificar que esté configurada la URL base
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (!base) {
    console.error('❌ Faltante: NEXT_PUBLIC_BASE_URL no está definido');
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Ruta a la que se quiere ir (por defecto: dashboard)
  const finalPath = redirectTo || '/dashboard';
  const redirectUrl = new URL(finalPath, base);

  // Añadir los parámetros obligatorios
  redirectUrl.searchParams.set('host', host);
  redirectUrl.searchParams.set('shop', shop);

  // Si se trata de una ruta embebida, añadimos "embedded=1"
  const isEmbeddedApp = finalPath.startsWith('/dashboard') || finalPath.startsWith('/integraciones');
  if (isEmbeddedApp) {
    redirectUrl.searchParams.set('embedded', '1');
  }

  console.log('🔁 Redirigiendo a:', redirectUrl.toString());

  return NextResponse.redirect(redirectUrl);
}
