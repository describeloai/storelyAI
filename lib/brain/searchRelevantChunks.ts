import OpenAI from 'openai';
import { sql } from '@vercel/postgres';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type SearchInput = {
  userId: string;
  assistantId: string;
  query: string;
  topK?: number;
  similarityThreshold?: number;
  allowedTypes?: ('text' | 'link' | 'file')[];
};

type ChunkWithVector = {
  content: string;
  similarity: number;
  embedding: number[];
  type: string | null;
  category: string | null;
  source: string | null;
  estimated_tokens: number | null;
};

export async function searchRelevantChunks({
  userId,
  assistantId,
  query,
  topK = 10,
  similarityThreshold = 0.85,
  allowedTypes = ['text', 'link', 'file'],
}: SearchInput): Promise<ChunkWithVector[]> {
  if (!query || query.length < 3) return [];

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

  const allowedTypesArray = `{${allowedTypes.join(',')}}`;

const allowedTypesSQL = `'{${allowedTypes.map(t => `"${t}"`).join(',')}}'`; // → '{\"text\",\"link\",\"file\"}'

const allowedTypesFormatted = `{"${allowedTypes.join('","')}"}`;

const { rows } = await sql`
  SELECT e.content, e.document_id, e.embedding, e.type, e.category, e.source, e.estimated_tokens,
    1 - (e.embedding <#> ${`[${queryEmbedding.join(',')}]`}) AS similarity
  FROM brain_embeddings e
  LEFT JOIN brain_access_permissions p
    ON e.document_id = p.item_id::uuid
    AND p.user_id = ${userId}
    AND p.assistant_id = ${assistantId}
  WHERE e.user_id = ${userId}
    AND e.type = ANY(${allowedTypesFormatted}::text[])
    AND (p.allowed IS NULL OR p.allowed = true)
  ORDER BY similarity DESC
  LIMIT ${topK * 5};
`;


  let filtered = rows.filter(r => r.similarity >= similarityThreshold);

  if (filtered.length > topK * 4) {
    similarityThreshold = Math.min(similarityThreshold + 0.05, 0.95);
    filtered = filtered.filter(r => r.similarity >= similarityThreshold);
    console.log(`⚠️ Threshold ajustado a ${similarityThreshold} por saturación`);
  }

  // Agrupar por documento
  const grouped: Record<string, ChunkWithVector[]> = {};
  for (const row of filtered) {
    if (!grouped[row.document_id]) grouped[row.document_id] = [];

    grouped[row.document_id].push({
      content: row.content,
      similarity: row.similarity,
      embedding: JSON.parse(row.embedding),
      type: row.type,
      category: row.category,
      source: row.source,
      estimated_tokens: row.estimated_tokens,
    });
  }

  // Top por documento
  const topByDocument = Object.values(grouped)
    .flatMap(docChunks =>
      docChunks
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 2)
    )
    .sort((a, b) => b.similarity - a.similarity);

  // Filtro de duplicados semánticos
  const final: ChunkWithVector[] = [];
  for (const candidate of topByDocument) {
    const isDuplicate = final.some(existing =>
      cosineSimilarity(candidate.embedding, existing.embedding) > 0.93
    );
    if (!isDuplicate) final.push(candidate);
    if (final.length >= topK) break;
  }

  console.log(`✅ Retrieved: ${rows.length} rows → ${filtered.length} filtered → ${final.length} final chunks`);
  return final;
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val ** 2, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val ** 2, 0));

  return dot / (normA * normB);
}