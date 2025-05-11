import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const shop = req.nextUrl.searchParams.get('shop');

  if (!shop || typeof shop !== 'string') {
    return new NextResponse('Missing shop parameter', { status: 400 });
  }

  const redirectUri = encodeURIComponent(`${process.env.SHOPIFY_APP_URL}/api/shopify/callback`);
  const installUrl = `https://${shop}/admin/oauth/authorize` +
    `?client_id=${process.env.SHOPIFY_API_KEY}` +
    `&scope=${process.env.SHOPIFY_SCOPES}` +
    `&redirect_uri=${redirectUri}`;

  return NextResponse.redirect(installUrl);
}
