// app/api/redirect-entry/route.ts
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
    console.error('❌ Faltante: NEXT_PUBLIC_BASE_URL no definido');
    return NextResponse.redirect(new URL('/', req.url));
  }

  const targetUrl = new URL(redirectTo, base);
  targetUrl.searchParams.set('host', host);
  targetUrl.searchParams.set('shop', shop);
  targetUrl.searchParams.set('embedded', '1');

  console.log('🔁 Redirigiendo al cliente desde API:', targetUrl.toString());

  return NextResponse.redirect(targetUrl);
}
