import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Role = 'system' | 'user' | 'assistant';

type AskCoreInput = {
  messages: { role: Role; content: string }[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  debug?: boolean;
};

export async function askCoreAI({
  messages,
  model = 'gpt-3.5-turbo',
  temperature = 0.7,
  max_tokens,
  debug = false,
}: AskCoreInput): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens,
    });

    const content = completion.choices[0]?.message?.content?.trim() ?? '';

    if (debug) {
      console.log(`🧠 [${model}]`);
      console.log(`Prompt tokens: ${completion.usage?.prompt_tokens}`);
      console.log(`Completion tokens: ${completion.usage?.completion_tokens}`);
      console.log(`Total tokens: ${completion.usage?.total_tokens}`);
    }

    return content;
  } catch (err: any) {
    console.error(`❌ [askCoreAI] Error usando modelo ${model}:`, err?.message || err);
    return 'Lo siento, ocurrió un error al procesar tu solicitud.';
  }
}
