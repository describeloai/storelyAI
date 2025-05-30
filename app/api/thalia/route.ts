import { NextRequest, NextResponse } from 'next/server';
import { askThalia } from '@/lib/ai/clients/askThalia';
import { detectThaliaIntent } from '@/lib/ai/intent/thalia';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  const { prompt, userId, history } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectThaliaIntent(prompt, true);

  // 🔍 Obtener configuración del usuario para Thalia
  let tone = 'friendly';
  let detailed = true;

  try {
    const { rows } = await sql`
      SELECT tone, detailed
      FROM assistant_settings
      WHERE user_id = ${userId} AND assistant_id = 'thalia'
      LIMIT 1
    `;
    if (rows.length > 0) {
      tone = rows[0].tone || tone;
      detailed = rows[0].detailed ?? detailed;
    }
  } catch (err) {
    console.warn('No assistant_settings found for user:', err);
  }

  // 🧠 Instrucciones dinámicas por tono y estilo
  const toneInstructions: Record<string, string> = {
    friendly: 'Use a warm, helpful and engaging tone.',
    professional: 'Be formal, concise and business-like.',
    playful: 'Use fun, light-hearted language, emojis and humor where appropriate.',
    direct: 'Be short, straightforward and to the point.',
  };

  const systemPrompt = `
You are Thalia, an AI assistant specialized in ecommerce operations and management.
${toneInstructions[tone] || 'Use a friendly tone.'}
${detailed ? 'Give detailed and structured answers.' : 'Keep responses brief and to the point.'}
  `;

  try {
    const output = await askThalia(prompt, intent, history, systemPrompt);
    return NextResponse.json({
      output,
      tool: intent.tool,
      model: intent.model,
    });
  } catch (err) {
    console.error('Thalia API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
