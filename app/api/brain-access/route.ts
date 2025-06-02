import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET: obtiene la lista de items con estado de acceso
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  const assistantId = req.nextUrl.searchParams.get('assistantId');

  if (!userId || !assistantId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const client = await pool.connect();

    const itemsRes = await client.query(
      `SELECT id, type, title, content FROM brain_items WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );

    const permissionsRes = await client.query(
      `SELECT item_id, allowed FROM brain_access_permissions WHERE user_id = $1 AND assistant_id = $2`,
      [userId, assistantId]
    );

    const permissionsMap = Object.fromEntries(
      permissionsRes.rows.map((row) => [row.item_id, row.allowed])
    );

    const items = itemsRes.rows.map((item: any) => {
      const hasTitle = item.title && item.title.trim() !== '';
      const fallbackTitle = item.content
        ? item.content.slice(0, 50).replace(/\s+/g, ' ') + '...'
        : 'Untitled';

      return {
        id: item.id,
        type: item.type,
        title: hasTitle ? item.title : fallbackTitle,
        allowed: permissionsMap[item.id] === undefined
          ? true
          : permissionsMap[item.id] === true,
      };
    });

    client.release();
    return NextResponse.json(items);
  } catch (error) {
    console.error('❌ Error in GET /api/brain-access:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH: inserta o actualiza el permiso de un asistente a un ítem
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { userId, assistantId, itemId, allowed } = body;

    if (!userId || !assistantId || !itemId) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    const client = await pool.connect();

    await client.query(
      `
      INSERT INTO brain_access_permissions (user_id, assistant_id, item_id, allowed)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id, assistant_id, item_id)
      DO UPDATE SET allowed = $4, updated_at = NOW()
      `,
      [userId, assistantId, itemId, allowed]
    );

    client.release();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error in PATCH /api/brain-access:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
