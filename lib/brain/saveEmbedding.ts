import { sql } from '@vercel/postgres';
import OpenAI from 'openai';
import { splitIntoChunks } from './splitIntoChunks'; // ✅ nuevo import

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
    // 🧠 Dividir en chunks optimizados (~200 tokens máx.)
    const chunks = splitIntoChunks(content);

    for (const chunk of chunks) {
      console.log(`🧩 Embedding para chunk:\n`, chunk.slice(0, 80) + '...');

      const embeddingRes = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: chunk,
      });

      const vector = embeddingRes.data[0].embedding;

      await sql`
        INSERT INTO brain_embeddings (
          user_id,
          assistant_id,
          content,
          embedding,
          type,
          folder
        ) VALUES (
          ${userId},
          ${assistantId},
          ${chunk},
          ${`[${vector.join(',')}]`},
          ${type},
          ${folder}
        )
      `;
    }

    console.log(`✅ ${chunks.length} embedding(s) guardados para ${assistantId}`);
  } catch (err) {
    console.error('🧠 Error generating or saving embedding:', err);
  }
}
