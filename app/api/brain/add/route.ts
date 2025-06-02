import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import pool from '@/lib/db/client';
import { saveBrainEmbedding } from '@/lib/brain/saveEmbedding';

export async function POST(req: NextRequest) {
  try {
    let newItem: any = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      position: 0,
    };

    const contentType = req.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      const body = await req.json();
      Object.assign(newItem, {
        userId: body.userId,
        storeKey: body.storeKey,
        type: body.type,
        title: body.title || '',
        content: body.content || '',
        fileUrl: body.fileUrl || null,
      });
    } else if (contentType?.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File;

      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');

      Object.assign(newItem, {
        userId: formData.get('userId'),
        storeKey: formData.get('storeKey'),
        type: 'file',
        title: file.name,
        content: '',
        fileUrl: `data:${file.type};base64,${base64}`,
      });
    } else {
      return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
    }

    // ✅ Guardar en brain_items (visual)
    await pool.query(
      `INSERT INTO brain_items (id, user_id, store_key, type, title, content, file_url, created_at, position)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        newItem.id,
        newItem.userId,
        newItem.storeKey,
        newItem.type,
        newItem.title,
        newItem.content,
        newItem.fileUrl,
        newItem.createdAt,
        newItem.position,
      ]
    );

    // ✅ Guardar embeddings únicos si es texto o link
    if (newItem.type === 'text' || newItem.type === 'link') {
      console.log('🧠 Generando embedding con contenido:', newItem.content);

      const assistantIds = ['sofia', 'mara', 'ciro', 'tariq', 'echo', 'thalia'];

      for (const assistantId of assistantIds) {
        const existing = await pool.query(
          `SELECT 1 FROM brain_embeddings WHERE user_id = $1 AND assistant_id = $2 AND content = $3 LIMIT 1`,
          [newItem.userId, assistantId, newItem.content]
        );

        if (existing.rows.length === 0) {
          await saveBrainEmbedding({
            userId: newItem.userId,
            assistantId,
            content: newItem.content,
            type: newItem.type,
          });
        } else {
          console.log(`⏭ Embedding ya existente para ${assistantId}, contenido omitido.`);
        }
      }
    }

    return NextResponse.json({ success: true, item: newItem });
  } catch (err) {
    console.error('❌ Error saving to Neon:', err);
    return NextResponse.json({ success: false, error: 'Failed to save item' }, { status: 500 });
  }
}