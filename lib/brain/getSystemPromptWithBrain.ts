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
  topK = 10,
  toneInstructions = defaultToneInstructions,
}: {
  assistantId: string;
  roleDescription: string;
  tone?: ToneType;
  detailed?: boolean;
  userId: string;
  prompt: string;
  topK?: number;
  toneInstructions?: Record<string, string>;
}) {
  // 🔍 Buscar contexto relevante del Brain
  const brainChunks = await searchRelevantChunks({
    userId,
    assistantId,
    query: prompt,
    topK,
  });

  // ✅ Limitar a los 5 primeros para ahorrar tokens, sin perder relevancia
  const brainContext = brainChunks
    .slice(0, 5)
    .map(c => `- ${c}`)
    .join('\n');

  // 🧠 Construir prompt final con tono + detalle + conocimiento del usuario
  const formattedPrompt = `
You are ${assistantId[0].toUpperCase() + assistantId.slice(1)}, ${roleDescription}.

${toneInstructions[tone] || toneInstructions.friendly}

${detailed
    ? 'Provide detailed, structured responses with relevant examples or steps.'
    : 'Keep responses short, clear, and action-oriented.'}

Use the user’s stored knowledge when relevant:
${brainContext}

Always prioritize accuracy and clarity based on the user’s own data.
  `.trim();

  console.log('🧠 Contexto generado desde Brain:\n', brainContext);
  return formattedPrompt;
}
