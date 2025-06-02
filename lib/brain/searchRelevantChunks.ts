import { sql } from '@vercel/postgres';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type SearchInput = {
  userId: string;
  assistantId: string;
  query: string;
  topK?: number;
  similarityThreshold?: number;
};

type ChunkWithVector = {
  content: string;
  similarity: number;
  embedding: number[];
};

export async function searchRelevantChunks({
  userId,
  assistantId,
  query,
  topK = 10,
  similarityThreshold = 0.85,
}: SearchInput): Promise<string[]> {
  if (!query || query.length < 3) return [];

  // 🔍 1. Obtener embedding del query
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

  // 🧠 2. Buscar en base de datos con vector y obtener también el embedding del chunk
  const { rows } = await sql`
    SELECT content, document_id, embedding, 1 - (embedding <#> ${`[${queryEmbedding.join(',')}]`}) AS similarity
    FROM brain_embeddings
    WHERE user_id = ${userId}
    AND assistant_id = ${assistantId}
    ORDER BY similarity DESC
    LIMIT ${topK * 5};
  `;

  let filtered = rows.filter(r => r.similarity >= similarityThreshold);

  if (filtered.length > topK * 4) {
    similarityThreshold = Math.min(similarityThreshold + 0.05, 0.95);
    filtered = filtered.filter(r => r.similarity >= similarityThreshold);
    console.log(`⚠️ Elevando threshold a ${similarityThreshold} por saturación semántica`);
  }

  // 📚 3. Agrupar por documento
  const grouped: Record<string, ChunkWithVector[]> = {};
  for (const row of filtered) {
    if (!grouped[row.document_id]) {
      grouped[row.document_id] = [];
    }
    grouped[row.document_id].push({
      content: row.content,
      similarity: row.similarity,
      embedding: JSON.parse(row.embedding), // ⚠️ parsear si Neon lo devuelve como string
    });
  }

  // 🔝 4. Elegimos top chunks por documento
  const topByDocument = Object.values(grouped)
    .flatMap(docChunks =>
      docChunks
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 2)
    )
    .sort((a, b) => b.similarity - a.similarity);

  // 🧠 5. Filtro de duplicados semánticos
  const final: ChunkWithVector[] = [];
  for (const candidate of topByDocument) {
    const isDuplicate = final.some(existing =>
      cosineSimilarity(candidate.embedding, existing.embedding) > 0.93
    );
    if (!isDuplicate) final.push(candidate);
    if (final.length >= topK) break;
  }

  const result = final.map(r => r.content);

  console.log(`✅ Retrieved rows: ${rows.length}`);
  console.log(`🔎 Relevant chunks (≥ ${similarityThreshold}): ${filtered.length}`);
  console.log('🧠 Final chunks:', result.slice(0, 3));

  return result;
}

// ✅ Función para comparar vectores (cosine similarity)
function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val ** 2, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val ** 2, 0));
  return dot / (normA * normB);
}
