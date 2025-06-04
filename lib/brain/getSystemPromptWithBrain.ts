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

  // --- DEBUGGING START ---
  console.log(`[getSystemPromptWithBrain] userId: ${userId}, isFirstMessage: ${isFirstMessage}`);

  // 🧠 Cargar contexto desde Account Settings (solo en primer mensaje)
  let accountChunk = null;
  if (isFirstMessage) {
    try {
      accountChunk = await pool.query(
        `SELECT content FROM brain_items
          WHERE user_id = $1 AND store_key = 'purple' AND source = 'account-settings'
          ORDER BY created_at DESC LIMIT 1`,
        [userId]
      );
      console.log("[getSystemPromptWithBrain] accountChunk fetched:", accountChunk.rows); // <-- LOG CRÍTICO
    } catch (dbError) {
      console.error("[getSystemPromptWithBrain] Error fetching accountChunk:", dbError);
    }
  } else {
    console.log("[getSystemPromptWithBrain] Not first message, skipping accountChunk fetch.");
  }
  
  const accountContent: string | null = accountChunk?.rows?.[0]?.content ?? null;
  console.log(`[getSystemPromptWithBrain] accountContent: "${accountContent}"`); // <-- LOG CRÍTICO

  // ****** ¡¡¡CAMBIO CLAVE AQUÍ!!! ****** (ya deberías tener esta lógica, pero la mantenemos para los logs)
  const accountLines = [];
  if (accountContent && isFirstMessage) {
    // Dividir la cadena por los nombres de los campos seguidos de ':'
    const parts = accountContent.split(/(Full name:|Store name:|Email:|Role:|Industry:)/g);

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part.endsWith(':')) {
        const value = parts[i + 1] ? parts[i + 1].trim() : '';
        let combinedLine = `${part.trim()} ${value}`;
        combinedLine = combinedLine.replace(/\s+/g, ' ').trim();
        accountLines.push(`- (text): ${combinedLine}`);
        i++;
      }
    }
  }
  console.log("[getSystemPromptWithBrain] accountLines generated:", accountLines); // <-- LOG CRÍTICO
  // ************ FIN CAMBIO ************
  // --- DEBUGGING END ---

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

  const promptChunks = [...accountLines, ...brainLines]; // Asegúrate de que accountLines esté al principio si es lo que quieres

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