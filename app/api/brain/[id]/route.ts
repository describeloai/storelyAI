import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db/client';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await pool.query(`DELETE FROM brain_items WHERE id = $1`, [id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting from Neon:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
