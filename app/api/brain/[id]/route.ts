import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db/client';

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop(); // Extrae el ID de la URL

  if (!id) {
    return NextResponse.json({ success: false, error: 'ID not found in URL' }, { status: 400 });
  }

  try {
    await pool.query(`DELETE FROM brain_items WHERE id = $1`, [id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting from Neon:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}