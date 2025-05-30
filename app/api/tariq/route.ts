import { NextRequest, NextResponse } from 'next/server';
import { askTariq } from '@/lib/ai/clients/askTariq';
import { detectTariqIntent } from '@/lib/ai/intent/tariq';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  const { prompt, userId, history } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectTariqIntent(prompt, true);

  // 🔍 Buscar configuración del usuario para Tariq
  let tone = 'friendly';
  let detailed = true;

  try {
    const { rows } = await sql`
      SELECT tone, detailed
      FROM assistant_settings
      WHERE user_id = ${userId} AND assistant_id = 'tariq'
      LIMIT 1
    `;
    if (rows.length > 0) {
      tone = rows[0].tone || tone;
      detailed = rows[0].detailed ?? detailed;
    }
  } catch (err) {
    console.warn('No assistant_settings found for user:', err);
  }

  const toneInstructions: Record<string, string> = {
    friendly: 'Use a warm, empathetic and helpful tone.',
    professional: 'Be formal, informative and respectful.',
    playful: 'Use light-hearted language, emojis, and a friendly vibe.',
    direct: 'Be brief, clear and get straight to the point.',
  };

  const systemPrompt = `
You are Tariq, an AI customer support assistant for ecommerce businesses.
${toneInstructions[tone] || 'Use a friendly tone.'}
${detailed ? 'Provide complete, structured responses including steps or solutions.' : 'Respond concisely and clearly.'}
`;

  try {
    const output = await askTariq(prompt, intent, history, systemPrompt);
    return NextResponse.json({
      output,
      tool: intent.tool,
      model: intent.model,
    });
  } catch (err) {
    console.error('Tariq API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
