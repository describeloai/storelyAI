import { currentUser } from '@clerk/nextjs/server';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ connected: false });

  const { rows } = await sql`
    SELECT * FROM user_integrations
    WHERE user_id = ${user.id} AND provider = 'gmail'
    LIMIT 1;
  `;

  return NextResponse.json({ connected: rows.length > 0 });
}
