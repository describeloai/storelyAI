import { sql } from '@vercel/postgres';
import OpenAI from 'openai';
import { splitIntoChunks } from './splitIntoChunks';
import { randomUUID } from 'crypto';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type EmbeddingInput = {
  userId: string;
  assistantId: string;
  content: string;
  type?: 'text' | 'link' | 'file';
  folder?: string | null;
};

export async function saveBrainEmbedding({
  userId,
  assistantId,
  content,
  type = 'text',
  folder = null,
}: EmbeddingInput) {
  if (!content || content.length < 10) return;

  try {
    const chunks = splitIntoChunks(content);
    const documentId = randomUUID(); // ID único para agrupar chunks del mismo texto

    for (const chunk of chunks) {
      console.log(`🧩 Embedding para chunk:\n`, chunk.slice(0, 80) + '...');

      const embeddingRes = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: chunk,
      });

      const vector = embeddingRes.data[0].embedding;
      const vectorString = `[${vector.join(',')}]`; // ✅ Seguro para Neon y Vercel/Postgres

      await sql`
        INSERT INTO brain_embeddings (
          user_id,
          assistant_id,
          content,
          embedding,
          type,
          folder,
          document_id,
          created_at
        ) VALUES (
          ${userId},
          ${assistantId},
          ${chunk},
          ${vectorString},
          ${type},
          ${folder},
          ${documentId},
          NOW()
        )
      `;
    }

    console.log(`✅ ${chunks.length} embedding(s) guardados para ${assistantId}`);
  } catch (err) {
    console.error('🧠 Error generating or saving embedding:', err);
  }
}
