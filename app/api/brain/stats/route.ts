// app/api/brain/stats/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const storeKey = searchParams.get('storeKey');

  if (!storeKey || (storeKey !== 'purple' && storeKey !== 'blue')) {
    return NextResponse.json({ error: 'Invalid storeKey' }, { status: 400 });
  }

  try {
    const client = await pool.connect();

    const [textResult, linkResult, fileResult] = await Promise.all([
      client.query(`SELECT COUNT(*) FROM brain_items WHERE store_key = $1 AND type = 'text'`, [storeKey]),
      client.query(`SELECT COUNT(*) FROM brain_items WHERE store_key = $1 AND type = 'link'`, [storeKey]),
      client.query(`SELECT COUNT(*) FROM brain_items WHERE store_key = $1 AND type = 'file'`, [storeKey]),
    ]);

    client.release();

    return NextResponse.json({
      text: parseInt(textResult.rows[0].count, 10),
      link: parseInt(linkResult.rows[0].count, 10),
      file: parseInt(fileResult.rows[0].count, 10),
    });
  } catch (err) {
    console.error('[STATS ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
