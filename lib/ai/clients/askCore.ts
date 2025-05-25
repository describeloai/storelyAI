import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Role = 'system' | 'user' | 'assistant';

export async function askCoreAI({
  messages,
  model = 'gpt-3.5-turbo',
  temperature = 0.7,
  max_tokens,
}: {
  messages: { role: Role; content: string }[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
}): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens,
    });

    const content = completion.choices[0]?.message?.content?.trim() ?? '';

    // Logging opcional (debug)
    // console.log(`[${model}] Prompt tokens: ${completion.usage?.prompt_tokens}, Completion tokens: ${completion.usage?.completion_tokens}`);

    return content;
  } catch (err) {
    console.error(`[askCoreAI] Error con modelo ${model}:`, err);
    return 'Lo siento, ocurrió un error al procesar tu solicitud.';
  }
}
