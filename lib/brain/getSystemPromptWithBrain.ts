import { searchRelevantChunks } from './searchRelevantChunks';

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
  topK = 8,
  maxCharPerChunk = 350,
  toneInstructions = defaultToneInstructions,
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
}) {
  const brainChunks = await searchRelevantChunks({
    userId,
    assistantId,
    query: prompt,
    topK,
  });

  const truncatedChunks = brainChunks
    .slice(0, topK)
    .map(c => {
      const trimmed = c.trim();
      return `- ${trimmed.length > maxCharPerChunk
        ? trimmed.slice(0, maxCharPerChunk).replace(/\s\S*$/, '') + '…'
        : trimmed}`;
    })
    .join('\n');

  const formattedPrompt = `
You are ${capitalize(assistantId)}, ${roleDescription}.

${toneInstructions[tone] || toneInstructions.friendly}

${detailed
    ? 'Provide detailed, structured responses with relevant examples or steps.'
    : 'Keep responses short, clear, and action-oriented.'}

Use the user’s stored knowledge when relevant:
${truncatedChunks}

Always prioritize accuracy and clarity based on the user’s own data.
  `.trim();

  console.log('🧠 Contexto generado desde Brain:\n', truncatedChunks);
  return formattedPrompt;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
