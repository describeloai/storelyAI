import { NextRequest, NextResponse } from 'next/server';
import { getOAuthClient } from '@/lib/integrations/gmail/getOAuthClient';

export async function GET() {
  const oAuth2Client = getOAuthClient();

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  });

  return NextResponse.redirect(authUrl);
}
