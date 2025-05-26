import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db/client'; // Asegúrate de tener este archivo creado

export async function GET(req: NextRequest) {
  const storeKey = req.nextUrl.searchParams.get('storeKey');
  const userId = 'demo-user'; // Reemplazar por auth real más adelante

  try {
    const res = await pool.query(
      `SELECT * FROM brain_items WHERE user_id = $1 AND store_key = $2 ORDER BY created_at DESC`,
      [userId, storeKey]
    );

    return NextResponse.json({ items: res.rows });
  } catch (err) {
    console.error('Error fetching from Neon:', err);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
