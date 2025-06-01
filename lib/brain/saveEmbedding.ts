import { sql } from '@vercel/postgres';
import OpenAI from 'openai';

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
    console.log('🧠 Generando embedding con contenido:', content);

    const embeddingRes = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: content,
    });

    const vector = embeddingRes.data[0].embedding;

await sql`
  INSERT INTO brain_embeddings (
    user_id,
    assistant_id,
    content,
    embedding,     -- ✅ nombre correcto de la columna
    type,
    folder
  ) VALUES (
    ${userId},
    ${assistantId},
    ${content},
    ${`[${vector.join(',')}]`},
    ${type},
    ${folder}
  )
`;

    console.log('✅ Embedding guardado correctamente');
  } catch (err) {
    console.error('🧠 Error generating or saving embedding:', err);
  }
}
