// app/api/brain/stats/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const storeKey = searchParams.get('storeKey');
  const userId = searchParams.get('userId'); // <--- ¡RECUPERAMOS EL userId DE LA URL!

  // ¡¡ADVERTENCIA DE SEGURIDAD!!
  // Obtener el userId directamente del cliente sin validación del lado del servidor
  // es INSEGURO. Un usuario malintencionado podría manipular este ID.
  // Se recomienda encarecidamente usar el middleware de Clerk para proteger esta ruta.

  if (!userId) {
    // Si no hay userId en la URL, devolvemos error (o 0 counts si prefieres)
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  if (!storeKey || (storeKey !== 'purple' && storeKey !== 'blue')) {
    return NextResponse.json({ error: 'Invalid storeKey' }, { status: 400 });
  }

  try {
    const client = await pool.connect();

    const [textResult, linkResult, fileResult] = await Promise.all([
      // ¡Las consultas ahora filtran por user_id Y store_key!
      client.query(
        `SELECT COUNT(*) FROM brain_items WHERE user_id = $1 AND store_key = $2 AND type = 'text'`,
        [userId, storeKey]
      ),
      client.query(
        `SELECT COUNT(*) FROM brain_items WHERE user_id = $1 AND store_key = $2 AND type = 'link'`,
        [userId, storeKey]
      ),
      client.query(
        `SELECT COUNT(*) FROM brain_items WHERE user_id = $1 AND store_key = $2 AND type = 'file'`,
        [userId, storeKey]
      ),
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