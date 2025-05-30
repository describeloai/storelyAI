import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const assistantId = searchParams.get('assistantId');

  if (!userId || !assistantId) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  }

  try {
    const { rows } = await sql`
      SELECT tone, detailed
      FROM assistant_settings
      WHERE user_id = ${userId} AND assistant_id = ${assistantId}
      LIMIT 1
    `;

    if (rows.length === 0) {
      return NextResponse.json({ tone: 'friendly', detailed: true });
    }

    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error('Error fetching assistant settings:', err);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const { userId, assistantId, tone, detailed } = await req.json();

  if (!userId || !assistantId || !tone || detailed === undefined) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    await sql`
      INSERT INTO assistant_settings (user_id, assistant_id, tone, detailed)
      VALUES (${userId}, ${assistantId}, ${tone}, ${detailed})
      ON CONFLICT (user_id, assistant_id)
      DO UPDATE SET tone = ${tone}, detailed = ${detailed}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error saving assistant settings:', err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
