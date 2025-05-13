import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const host = searchParams.get('host');
  const shop = searchParams.get('shop');
  const embedded = searchParams.get('embedded');

  if (!host || !shop || !embedded) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Redirigir al dashboard con los parámetros necesarios para App Bridge
  const redirectUrl = new URL('/dashboard', process.env.NEXT_PUBLIC_BASE_URL);
  redirectUrl.searchParams.set('host', host);
  redirectUrl.searchParams.set('shop', shop);
  redirectUrl.searchParams.set('embedded', embedded);

  return NextResponse.redirect(redirectUrl);
}
