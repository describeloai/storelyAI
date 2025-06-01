import { sql } from '@vercel/postgres'; // ✅ instalar si no lo tienes// ✅ importar array correctamente
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function searchRelevantChunks({
  userId,
  assistantId,
  query,
  topK = 5,
}: {
  userId: string;
  assistantId: string;
  query: string;
  topK?: number;
}) {
  if (!query || query.length < 3) return [];

  // 🔍 Obtener embedding de la query
  const embeddingRes = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });

  const queryEmbedding = embeddingRes.data[0].embedding;

  console.log('🔍 Searching brain embeddings for:', {
    userId,
    assistantId,
    query,
    queryEmbeddingPreview: queryEmbedding.slice(0, 5),
  });

  // 📌 Buscar por distancia vectorial (requiere columna vector)
  const { rows } = await sql`
  SELECT content
  FROM brain_embeddings
  WHERE user_id = ${userId}
  AND assistant_id = ${assistantId}
  ORDER BY embedding <#> ${`[${queryEmbedding.join(',')}]`} ASC
  LIMIT ${topK};
`;


  console.log('✅ Retrieved rows:', rows.length);
  console.log('🔎 brainChunks encontrados:', rows.length);
  console.log('🧠 Primeros resultados:', rows.slice(0, 2));
  return rows.map(r => r.content);
}
