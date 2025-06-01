import { sql } from '@vercel/postgres';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function searchRelevantChunks({
  userId,
  assistantId,
  query,
  topK = 5,
  similarityThreshold = 0.85, // ✅ NUEVO: umbral mínimo de relevancia
}: {
  userId: string;
  assistantId: string;
  query: string;
  topK?: number;
  similarityThreshold?: number; // 1 = idéntico, 0 = totalmente distinto
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

  // 📌 Consultar por distancia vectorial (cuanto menor, más similar)
  const { rows } = await sql`
    SELECT content, 1 - (embedding <#> ${`[${queryEmbedding.join(',')}]`}) AS similarity
    FROM brain_embeddings
    WHERE user_id = ${userId}
    AND assistant_id = ${assistantId}
    ORDER BY similarity DESC
    LIMIT ${topK};
  `;

  // 🎯 Filtrar por similitud mínima
  const relevantChunks = rows.filter(r => r.similarity >= similarityThreshold).map(r => r.content);

  console.log(`✅ Retrieved rows: ${rows.length}`);
  console.log(`🔎 Relevant chunks (similarity ≥ ${similarityThreshold}): ${relevantChunks.length}`);
  console.log('🧠 Primeros resultados:', relevantChunks.slice(0, 2));

  return relevantChunks;
}
