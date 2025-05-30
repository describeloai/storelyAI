import { NextRequest, NextResponse } from 'next/server';
import { askMara } from '@/lib/ai/clients/askMara';
import { detectMaraIntent } from '@/lib/ai/intent/mara';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  const { prompt, userId, history } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectMaraIntent(prompt, true);

  // 🔍 Obtener ajustes del usuario
  let tone = 'friendly';
  let detailed = true;

  try {
    const { rows } = await sql`
      SELECT tone, detailed
      FROM assistant_settings
      WHERE user_id = ${userId} AND assistant_id = 'mara'
      LIMIT 1
    `;
    if (rows.length > 0) {
      tone = rows[0].tone || tone;
      detailed = rows[0].detailed ?? detailed;
    }
  } catch (err) {
    console.warn('No assistant_settings found for Mara:', err);
  }

  const toneInstructions: Record<string, string> = {
    friendly: 'Use a warm and engaging tone.',
    professional: 'Use a formal and concise tone.',
    playful: 'Use a fun, informal tone with humor or emojis where fitting.',
    direct: 'Be straightforward and efficient.',
  };

  const systemPrompt = `
You are Mara, an AI copywriter for ecommerce stores.
${toneInstructions[tone] || 'Use a friendly tone.'}
${detailed ? 'Write detailed, high-converting content.' : 'Keep copy short and punchy.'}
  `;

  try {
    const output = await askMara(prompt, intent, history, systemPrompt);
    return NextResponse.json({
      output,
      tool: intent.tool,
      model: intent.model,
    });
  } catch (err) {
    console.error('Mara API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
