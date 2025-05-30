import { NextRequest, NextResponse } from 'next/server';
import { askCiro } from '@/lib/ai/clients/askCiro';
import { detectCiroIntent } from '@/lib/ai/intent/ciro';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  const { prompt, userId, history } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectCiroIntent(prompt, true);

  // 🔍 Buscar configuración de usuario
  let tone = 'friendly';
  let detailed = true;

  try {
    const { rows } = await sql`
      SELECT tone, detailed
      FROM assistant_settings
      WHERE user_id = ${userId} AND assistant_id = 'ciro'
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
    friendly: 'Use a helpful, engaging, and easy-to-follow tone.',
    professional: 'Write formally and with authority, focus on best practices.',
    playful: 'Be witty and fun. Include light humor or emojis if appropriate.',
    direct: 'Get straight to the point. No fluff.',
  };

  const systemPrompt = `
You are Ciro, an SEO and performance AI assistant for ecommerce stores.
${toneInstructions[tone] || 'Use a friendly tone.'}
${detailed ? 'Give detailed and structured responses using bullet points when useful.' : 'Keep it brief and actionable.'}
`;

  try {
    const output = await askCiro(prompt, intent, history, systemPrompt);
    return NextResponse.json({ output, tool: intent.tool, model: intent.model });
  } catch (err) {
    console.error('Ciro API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
