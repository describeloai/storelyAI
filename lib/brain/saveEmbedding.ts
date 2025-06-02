import { sql } from '@vercel/postgres';
import OpenAI from 'openai';
import { splitIntoChunks } from './splitIntoChunks';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type EmbeddingInput = {
  userId: string;
  assistantId: string;
  content: string;
  documentId: string; // ✅ ahora obligatorio para vincular con brain_items
  type?: 'text' | 'link' | 'file';
  folder?: string | null;
  source?: string | null;
  category?: string | null;
};

export async function saveBrainEmbedding({
  userId,
  assistantId,
  content,
  documentId,
  type = 'text',
  folder = null,
  source = null,
  category = null,
}: EmbeddingInput) {
  if (!content || content.length < 10) return;

  try {
    const chunks = splitIntoChunks(content);

    for (const chunk of chunks) {
      console.log(`🧩 Embedding para chunk:\n`, chunk.slice(0, 80) + '...');

      const estimatedTokens = Math.ceil(chunk.length / 4);

      const embeddingRes = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: chunk,
      });

      const vector = embeddingRes.data[0].embedding;
      const vectorString = `[${vector.join(',')}]`;

      await sql`
        INSERT INTO brain_embeddings (
          user_id,
          assistant_id,
          content,
          embedding,
          estimated_tokens,
          type,
          folder,
          source,
          category,
          document_id,
          created_at
        ) VALUES (
          ${userId},
          ${assistantId},
          ${chunk},
          ${vectorString},
          ${estimatedTokens},
          ${type},
          ${folder},
          ${source},
          ${category},
          ${documentId}, -- ✅ ya enlazado con brain_items
          NOW()
        )
      `;
    }

    console.log(`✅ ${chunks.length} embedding(s) guardados para ${assistantId}`);
  } catch (err) {
    console.error('🧠 Error generating or saving embedding:', err);
  }
}
