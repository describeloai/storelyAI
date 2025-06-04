import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import pool from '@/lib/db/client';
import { saveBrainEmbedding } from '@/lib/brain/saveEmbedding';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    const isForm = contentType?.includes('multipart/form-data');

    let newItem: any = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      position: 0,
    };

    let userIdFromRequest: string | null = null;

    if (isJson) {
      const body = await req.json();
      userIdFromRequest = body.userId;
      
      // LOG para depurar el contenido que se va a guardar
      console.log("Backend (items/route.ts): Content recibido y a guardar:", body.content); 
      
      Object.assign(newItem, {
        userId: body.userId,
        storeKey: body.storeKey,
        folderId: body.folderId || null,
        type: body.type,
        title: body.title || '',
        content: body.content || '', // El contenido con \n
        fileUrl: body.fileUrl || null,
        source: body.source || null,
        category: body.category || null,
      });
    } else if (isForm) {
      const formData = await req.formData();
      userIdFromRequest = formData.get('userId') as string;
      const file = formData.get('file') as File;
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');

      Object.assign(newItem, {
        userId: formData.get('userId'),
        storeKey: formData.get('storeKey'),
        folderId: formData.get('folderId') || null,
        type: 'file',
        title: file.name,
        content: '',
        fileUrl: `data:${file.type};base64,${base64}`,
        source: formData.get('source') || null,
        category: formData.get('category') || null,
      });
    } else {
      return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
    }

    if (!userIdFromRequest) {
      console.error('❌ Error: userId no proporcionado en la petición POST.');
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }
    newItem.userId = userIdFromRequest;

    // ✅ Guardar en brain_items
    await pool.query(
      `INSERT INTO brain_items (
        id, user_id, store_key, type, title, content, file_url,
        created_at, position, folder_id, source, category
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`, 
      [
        newItem.id,
        newItem.userId,
        newItem.storeKey,
        newItem.type,
        newItem.title,
        newItem.content, // Este es el content que ya viene con \n desde el frontend
        newItem.fileUrl,
        newItem.createdAt,
        newItem.position,
        newItem.folderId,
        newItem.source,
        newItem.category,
      ]
    );

    // ✅ Guardar embeddings si es texto o link
    if (newItem.type === 'text' || newItem.type === 'link') {
      const assistantIds = ['sofia', 'mara', 'ciro', 'tariq', 'echo', 'thalia'];

      for (const assistantId of assistantIds) {
        const exists = await pool.query(
          `SELECT 1 FROM brain_embeddings WHERE user_id = $1 AND assistant_id = $2 AND content = $3 LIMIT 1`,
          [newItem.userId, assistantId, newItem.content]
        );

        if (exists.rows.length === 0) {
          console.log('🧠 Generando embedding con contenido:', newItem.content);
          await saveBrainEmbedding({
            userId: newItem.userId,
            assistantId,
            content: newItem.content,
            documentId: newItem.id,
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