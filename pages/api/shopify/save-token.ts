import type { NextApiRequest, NextApiResponse } from 'next';
import { auth, clerkClient } from '@clerk/nextjs/server';

// @ts-ignore
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
// @ts-ignore
  const { userId } = auth();

  if (!userId) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const { shop, accessToken } = req.body;

  if (
    typeof shop !== 'string' ||
    typeof accessToken !== 'string' ||
    shop.length < 5 ||
    accessToken.length < 10
  ) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    // @ts-ignore
    await clerkClient.users.updateUser(userId, {
      privateMetadata: { shop, accessToken },
    });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('❌ Error al guardar token:', err.message);
    return res.status(500).json({ error: 'Error al guardar token' });
  }
}
