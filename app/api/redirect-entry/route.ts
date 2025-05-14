import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const host = searchParams.get('host');
  const shop = searchParams.get('shop');
  const embedded = searchParams.get('embedded');
  const redirectTo = searchParams.get('redirectTo');

  if (!host || !shop || !embedded) {
    // ⚠️ Redirección a la raíz si faltan parámetros importantes
    return NextResponse.redirect(new URL('/', req.url));
  }

  // ✅ Usar la URL original si fue enviada desde AppBridgeProvider
  const finalPath = redirectTo || '/dashboard';
  const redirectUrl = new URL(finalPath, process.env.NEXT_PUBLIC_BASE_URL);

  // Asegurar que lleva los parámetros necesarios para App Bridge
  redirectUrl.searchParams.set('host', host);
  redirectUrl.searchParams.set('shop', shop);
  redirectUrl.searchParams.set('embedded', embedded);

  return NextResponse.redirect(redirectUrl);
}
