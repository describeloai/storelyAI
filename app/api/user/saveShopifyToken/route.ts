// app/api/user/saveShopifyToken/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  const body = await req.json();
  const { shop, accessToken } = body;

  console.log('🔐 userId desde Clerk:', userId);
  console.log('🛒 shop:', shop);
  console.log('🔑 accessToken:', accessToken);

  if (!userId || !shop || !accessToken) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
  }

  try {
    const res = await axios.patch(
      `https://api.clerk.com/v1/users/${userId}/metadata`,
      {
        private_metadata: {
          shopifyShop: shop,
          shopifyAccessToken: accessToken,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Clerk respondió:', res.data);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('❌ Error al guardar token en Clerk:', {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    });

    return NextResponse.json(
      { error: err.response?.data || 'No se pudo guardar el token' },
      { status: 500 }
    );
  }
}
