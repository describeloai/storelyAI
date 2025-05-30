import { NextRequest, NextResponse } from 'next/server';
import { askSofia } from '@/lib/ai/clients/askSofia';
import { detectSofiaIntent } from '@/lib/ai/intent/sofia';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  const { prompt, userId, history } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectSofiaIntent(prompt, true);

  // 🔍 Buscar configuración del usuario para Sofía
  let tone = 'friendly';
  let detailed = true;

  try {
    const { rows } = await sql`
      SELECT tone, detailed
      FROM assistant_settings
      WHERE user_id = ${userId} AND assistant_id = 'sofia'
      LIMIT 1
    `;
    if (rows.length > 0) {
      tone = rows[0].tone || tone;
      detailed = rows[0].detailed ?? detailed;
    }
  } catch (err) {
    console.warn('No assistant_settings found for user:', err);
  }

  // 🧠 Construir prompt dinámico según tono y detalle
  const toneInstructions: Record<string, string> = {
    friendly: 'Speak in a warm, supportive and helpful way, using clear and encouraging language.',
    professional: 'Use formal, polite, and concise language appropriate for business settings.',
    playful: 'Be fun, engaging and humorous. Use emojis and light-hearted expressions where appropriate.',
    direct: 'Be clear, assertive and to the point. Avoid unnecessary elaboration.',
  };

  const systemPrompt = `
You are Sofía, an AI marketing assistant for ecommerce stores.

${toneInstructions[tone] || toneInstructions.friendly}

${detailed
    ? 'Give detailed and structured answers with useful context and explanation.'
    : 'Keep responses brief, action-oriented and straight to the point.'}
`;

  try {
    const output = await askSofia(prompt, intent, history, systemPrompt);
    return NextResponse.json({ output, tool: intent.tool, model: intent.model });
  } catch (err) {
    console.error('Sofía API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
