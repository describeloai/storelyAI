import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function askCoreAI({
  messages,
  model = 'gpt-3.5-turbo', // 🧠 default ahorrador
  temperature = 0.7,
}: {
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[];
  model?: string;
  temperature?: number;
}) {
  const completion = await openai.chat.completions.create({
    model,
    messages,
    temperature,
  });

  return completion.choices[0].message.content ?? '';
}
