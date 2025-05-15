import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const host = searchParams.get('host');
  const shop = searchParams.get('shop');
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  if (!host || !shop) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (!base) {
    console.error('❌ Faltante: NEXT_PUBLIC_BASE_URL no está definido');
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Construimos el destino real: /dashboard?shop=...&host=...&embedded=1
  const targetUrl = new URL(redirectTo, base);
  targetUrl.searchParams.set('host', host);
  targetUrl.searchParams.set('shop', shop);

  const isEmbeddedApp =
    redirectTo.startsWith('/dashboard') || redirectTo.startsWith('/integraciones');
  if (isEmbeddedApp) {
    targetUrl.searchParams.set('embedded', '1');
  }

  // Redirigir siempre al login, con redirect_url al destino final
  const loginUrl = new URL('/sign-in', base);
  loginUrl.searchParams.set('redirect_url', targetUrl.pathname + '?' + targetUrl.searchParams.toString());

  console.log('🔁 Redirigiendo al login con destino:', loginUrl.toString());

  return NextResponse.redirect(loginUrl);
}
