import { NextRequest, NextResponse } from 'next/server';
import { getOAuthClient } from '@/lib/integrations/gmail/getOAuthClient';
import { insertOrUpdateToken } from '@/lib/integrations/gmail/tokens';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  const user = await currentUser();
  if (!user || !code) return NextResponse.redirect('/dashboard/integraciones?error=unauthorized');

  const oAuth2Client = getOAuthClient();
  const { tokens } = await oAuth2Client.getToken(code);

  // Guarda en Neon
  await insertOrUpdateToken({
    userId: user.id,
    provider: 'gmail',
    accessToken: tokens.access_token!,
    refreshToken: tokens.refresh_token!,
    expiresAt: tokens.expiry_date!,
  });

  return NextResponse.redirect('/dashboard/integraciones?success=gmail');
}
