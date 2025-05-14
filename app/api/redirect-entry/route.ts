import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const host = searchParams.get('host');
  const shop = searchParams.get('shop');
  const redirectTo = searchParams.get('redirectTo');

  if (!host || !shop) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (!base) {
    console.error('❌ Faltante: NEXT_PUBLIC_BASE_URL no está definido');
    return NextResponse.redirect(new URL('/', req.url));
  }

  const finalPath = redirectTo || '/dashboard';
  const redirectUrl = new URL(finalPath, base);

  redirectUrl.searchParams.set('host', host);
  redirectUrl.searchParams.set('shop', shop);

  console.log('🔁 Redirigiendo a:', redirectUrl.toString());

  return NextResponse.redirect(redirectUrl);
}
