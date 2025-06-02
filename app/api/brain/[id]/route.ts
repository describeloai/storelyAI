import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db/client';

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ success: false, error: 'ID not found in URL' }, { status: 400 });
  }

  try {
    // 1️⃣ Obtener user_id y content antes de borrar
    const result = await pool.query(
      `SELECT user_id, content FROM brain_items WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    const { user_id, content } = result.rows[0];

    // 2️⃣ Borrar de brain_items
    await pool.query(`DELETE FROM brain_items WHERE id = $1`, [id]);

    // 3️⃣ Borrar de brain_embeddings (por user y contenido exacto)
    await pool.query(
      `DELETE FROM brain_embeddings WHERE user_id = $1 AND content = $2`,
      [user_id, content]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Error deleting from Neon:', err);
    console.log('🧠 Incoming DELETE for ID:', id);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}