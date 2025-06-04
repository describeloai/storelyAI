import { searchRelevantChunks } from './searchRelevantChunks';
import pool from '@/lib/db/client';

type ToneType = 'friendly' | 'professional' | 'playful' | 'direct';

const defaultToneInstructions: Record<ToneType, string> = {
  friendly: 'Use a warm, friendly and helpful tone.',
  professional: 'Use a formal, concise and business-like tone.',
  playful: 'Use light-hearted language, emojis and humor where appropriate.',
  direct: 'Be short, clear and to the point.',
};

export async function getSystemPromptWithBrain({
  assistantId,
  roleDescription,
  tone = 'friendly',
  detailed = true,
  userId,
  prompt,
  topK = 2,
  maxCharPerChunk = 350,
  toneInstructions = defaultToneInstructions,
  isFirstMessage = false,
}: {
  assistantId: string;
  roleDescription: string;
  tone?: ToneType;
  detailed?: boolean;
  userId: string;
  prompt: string;
  topK?: number;
  maxCharPerChunk?: number;
  toneInstructions?: Record<string, string>;
  isFirstMessage?: boolean;
}) {
  const brainChunks = await searchRelevantChunks({
    userId,
    assistantId,
    query: prompt,
    topK,
  });

  // 🧠 Cargar contexto desde Account Settings (solo en primer mensaje)
  const accountChunk = isFirstMessage
    ? await pool.query(
        `SELECT content FROM brain_items
         WHERE user_id = $1 AND store_key = 'purple' AND source = 'account-settings'
         ORDER BY created_at DESC LIMIT 1`,
        [userId]
      )
    : null;

  const accountContent: string | null = accountChunk?.rows?.[0]?.content ?? null;

  const accountLines =
    accountContent && isFirstMessage
      ? accountContent
          .split('\n')
          .map(line => `- (text): ${line.trim()}`)
          .filter(Boolean)
      : [];

  const brainLines = brainChunks.map(chunk => {
    const content = chunk.content.trim();
    const shortened =
      content.length > maxCharPerChunk
        ? content.slice(0, maxCharPerChunk).replace(/\s\S*$/, '') + '…'
        : content;

    const meta = [
      chunk.type ? `(${chunk.type})` : '',
      chunk.category ? `[${chunk.category}]` : '',
      chunk.source ? `«${chunk.source}»` : '',
    ]
      .filter(Boolean)
      .join(' ');

    return `- ${meta ? meta + ': ' : ''}${shortened}`;
  });

  const promptChunks = [...accountLines, ...brainLines];

  const introPrompt = isFirstMessage
    ? `${toneInstructions[tone] || toneInstructions.friendly}

${detailed
        ? 'Provide detailed, structured responses with relevant examples or steps.'
        : 'Keep responses short, clear, and action-oriented.'}

Use the user’s stored knowledge when relevant:`
    : 'Relevant context:';

  const formattedPrompt = `
You are ${capitalize(assistantId)}, ${roleDescription}.

${introPrompt}
${promptChunks.join('\n')}

${isFirstMessage ? 'Always prioritize accuracy and clarity based on the user’s own data.' : ''}
  `.trim();

  console.log('🧠 Prompt generado:\n', formattedPrompt);
  return formattedPrompt;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
