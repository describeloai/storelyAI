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
    LIMIT 30;
  `;

  let filtered = rows.filter(r => r.similarity >= similarityThreshold);

  if (filtered.length > 20) {
    similarityThreshold = Math.min(similarityThreshold + 0.05, 0.95);
    filtered = filtered.filter(r => r.similarity >= similarityThreshold);
    console.log(`⚠️ Threshold ajustado a ${similarityThreshold} por saturación`);
  }

  const topCandidates = filtered.slice(0, 10); // 🧠 Solo procesamos los 10 más similares
  const final: ChunkWithVector[] = [];
  const seenBaseTexts = new Set<string>();

  for (const row of topCandidates) {
    const embedding = JSON.parse(row.embedding);
    const candidate: ChunkWithVector = {
      content: row.content,
      similarity: row.similarity,
      embedding,
      type: row.type,
      category: row.category,
      source: row.source,
      estimated_tokens: row.estimated_tokens,
    };

    const baseText = candidate.content
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .slice(0, 50);

    const isDuplicate =
      final.some(existing => {
        const cos = cosineSimilarity(candidate.embedding, existing.embedding);
        const jac = jaccardSimilarity(candidate.content, existing.content);
        const sameStart = candidate.content.slice(0, 30) === existing.content.slice(0, 30);
        return cos > 0.85 || jac > 0.5 || sameStart;
      }) || seenBaseTexts.has(baseText);

    if (!isDuplicate) {
      final.push(candidate);
      seenBaseTexts.add(baseText);
    }

    if (final.length >= 2) break; // ⚡ Solo queremos hasta 2
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

function jaccardSimilarity(a: string, b: string): number {
  const setA = new Set(a.toLowerCase().split(/\W+/));
  const setB = new Set(b.toLowerCase().split(/\W+/));
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}
