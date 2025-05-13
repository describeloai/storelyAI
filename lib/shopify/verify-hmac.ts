import crypto from 'crypto';

export function verifyHmac({ rawBody, hmacHeader }: { rawBody: string; hmacHeader: string | null }): boolean {
  if (!hmacHeader) return false;

  const secret = process.env.SHOPIFY_API_SECRET!;
  const generatedHmac = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('base64');

  return crypto.timingSafeEqual(Buffer.from(generatedHmac), Buffer.from(hmacHeader));
}
