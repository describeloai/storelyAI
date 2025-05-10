import type { NextApiRequest, NextApiResponse } from 'next';
import { auth, clerkClient } from '@clerk/nextjs/server';

// @ts-ignore
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
// @ts-ignore
  const { userId } = auth();
// @ts-ignore
  if (!userId) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    // @ts-ignore
    await clerkClient.users.updateUser(userId, {
      privateMetadata: { shop: null, accessToken: null },
    });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('❌ Error al desconectar Shopify:', err.message);
    return res.status(500).json({ error: 'Error al desconectar' });
  }
}
