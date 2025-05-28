import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db/client';

export async function PATCH(req: NextRequest) {
  try {
    const { items } = await req.json();

    // items = [{ id: 'abc123', position: 0 }, { id: 'def456', position: 1 }, ...]

    const updatePromises = items.map((item: { id: string; position: number }) =>
      pool.query(
        `UPDATE brain_items SET position = $1 WHERE id = $2`,
        [item.position, item.id]
      )
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error updating order in Neon:', err);
    return NextResponse.json({ success: false, error: 'Failed to update order' }, { status: 500 });
  }
}