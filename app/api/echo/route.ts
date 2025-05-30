import { NextRequest, NextResponse } from 'next/server';
import { askEcho } from '@/lib/ai/clients/askEcho';
import { detectEchoIntent } from '@/lib/ai/intent/echo';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  const { prompt, userId, history } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectEchoIntent(prompt, true);

  // 🔍 Obtener preferencias del usuario
  let tone = 'friendly';
  let detailed = true;

  try {
    const { rows } = await sql`
      SELECT tone, detailed
      FROM assistant_settings
      WHERE user_id = ${userId} AND assistant_id = 'echo'
      LIMIT 1
    `;
    if (rows.length > 0) {
      tone = rows[0].tone || tone;
      detailed = rows[0].detailed ?? detailed;
    }
  } catch (err) {
    console.warn('No assistant_settings found for Echo:', err);
  }

  const toneInstructions: Record<string, string> = {
    friendly: 'Use a warm, helpful and engaging tone.',
    professional: 'Be formal, concise and business-like.',
    playful: 'Use fun, light-hearted language, emojis and humor where appropriate.',
    direct: 'Be short, straightforward and to the point.',
  };

  const systemPrompt = `
You are Echo, a data analyst AI assistant for ecommerce stores.
${toneInstructions[tone] || 'Use a friendly tone.'}
${detailed ? 'Give detailed insights with clear explanations.' : 'Summarize findings quickly and clearly.'}
`;

  try {
    const output = await askEcho(prompt, intent, history, systemPrompt);
    return NextResponse.json({ output, tool: intent.tool, model: intent.model });
  } catch (err) {
    console.error('Echo API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
