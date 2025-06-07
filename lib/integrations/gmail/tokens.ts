import { sql } from '@vercel/postgres';

export async function insertOrUpdateToken({ userId, provider, accessToken, refreshToken, expiresAt }: {
  userId: string;
  provider: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}) {
  await sql`
    INSERT INTO user_integrations (user_id, provider, access_token, refresh_token, expires_at)
    VALUES (${userId}, ${provider}, ${accessToken}, ${refreshToken}, to_timestamp(${expiresAt! / 1000}))
    ON CONFLICT (user_id, provider)
    DO UPDATE SET
      access_token = ${accessToken},
      refresh_token = ${refreshToken},
      expires_at = to_timestamp(${expiresAt! / 1000})
  `;
}
