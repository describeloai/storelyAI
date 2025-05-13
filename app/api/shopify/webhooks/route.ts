import { NextRequest, NextResponse } from 'next/server';
import { verifyHmac } from '@/lib/shopify/verify-hmac';

export async function POST(req: NextRequest) {
  const hmacHeader = req.headers.get('x-shopify-hmac-sha256');
  const topic = req.headers.get('x-shopify-topic');
  const rawBody = await req.text();

  // Verificación HMAC
  const isValid = verifyHmac({ rawBody, hmacHeader });
  if (!isValid) {
    return new NextResponse('Firma HMAC inválida', { status: 401 });
  }

  const body = JSON.parse(rawBody);

  switch (topic) {
    case 'customers/data_request':
      console.log('🔐 customer data request:', body);
      break;
    case 'customers/redact':
      console.log('🧹 customer redact:', body);
      break;
    case 'shop/redact':
      console.log('🧼 shop redact:', body);
      break;
    default:
      console.log('📭 Webhook desconocido:', topic);
      break;
  }

  return new NextResponse('Webhook recibido', { status: 200 });
}
