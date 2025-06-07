import { google } from 'googleapis';

export const getOAuthClient = () => {
  return new google.auth.OAuth2({
    clientId: process.env.GMAIL_CLIENT_ID!,
    clientSecret: process.env.GMAIL_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/integrations/gmail/callback`,
  });
};
