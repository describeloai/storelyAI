import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db/client';

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop(); // Este 'id' es el id del brain_item a borrar

  if (!id) {
    return NextResponse.json({ success: false, error: 'ID not found in URL' }, { status: 400 });
  }

  // ¡¡ADVERTENCIA DE SEGURIDAD!!
  // Obtener el userId directamente del cliente sin validación del lado del servidor
  // es INSEGURO. Un usuario malintencionado podría manipular este ID.
  // Como no estás usando middleware, este DELETE debería verificar que el userId que borra
  // sea el mismo que el userId que inicia la sesión. Aquí asumimos que el userId del item
  // es el que debemos borrar.

  try {
    // 1️⃣ Obtener user_id y document_id (el id del brain_item) ANTES de borrar el brain_item
    // Necesitamos el user_id para la cláusula WHERE y el id del item como document_id
    const result = await pool.query(
      `SELECT user_id FROM brain_items WHERE id = $1`, // Solo necesitamos user_id aquí, el document_id es el 'id' de la URL
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    const { user_id } = result.rows[0]; // Obtenemos el user_id del item a borrar

    // 2️⃣ Borrar de brain_items
    await pool.query(`DELETE FROM brain_items WHERE id = $1`, [id]);

    // 3️⃣ Borrar de brain_embeddings usando document_id y user_id
    // document_id en brain_embeddings corresponde al id del brain_item original.
    await pool.query(
      `DELETE FROM brain_embeddings WHERE user_id = $1 AND document_id = $2`, // <--- ¡CORRECCIÓN CLAVE AQUÍ!
      [user_id, id] // Usamos el user_id del item y el ID del item como document_id
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Error deleting from Neon:', err);
    console.log('🧠 Incoming DELETE for ID:', id);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}