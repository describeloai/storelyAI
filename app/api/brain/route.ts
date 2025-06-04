import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db/client';
// import { auth } from '@clerk/nextjs/server'; // <--- ELIMINAMOS ESTA IMPORTACIÓN

export async function GET(req: NextRequest) {
  // ¡¡ADVERTENCIA DE SEGURIDAD!!
  // Obtener el userId directamente del cliente sin validación del lado del servidor
  // es INSEGURO. Un usuario malintencionado podría manipular este ID.
  // Se recomienda encarecidamente usar el middleware de Clerk para proteger esta ruta.
  const userId = req.nextUrl.searchParams.get('userId'); // <--- OBTENEMOS userId DE LOS PARÁMETROS DE BÚSQUEDA

  if (!userId) {
    // Si no se proporciona userId en la URL, no podemos devolver items.
    return NextResponse.json({ items: [], error: 'User ID is required' }, { status: 400 }); // 400 Bad Request
  }

  const storeKey = req.nextUrl.searchParams.get('storeKey');

  if (!storeKey) {
    return NextResponse.json({ items: [], error: 'Store Key is required' }, { status: 400 }); // 400 Bad Request
  }

  try {
    const res = await pool.query(
      `SELECT * FROM brain_items WHERE user_id = $1 AND store_key = $2 ORDER BY created_at DESC`,
      [userId, storeKey] // Usamos el userId obtenido de la URL
    );

    return NextResponse.json({ items: res.rows });
  } catch (err) {
    console.error('Error fetching from Neon:', err);
    return NextResponse.json({ items: [] }, { status: 500 }); // 500 Internal Server Error
  }
}
