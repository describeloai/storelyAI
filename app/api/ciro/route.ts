import { NextRequest, NextResponse } from 'next/server';
import { askCiro } from '@/lib/ai/clients/askCiro';
import { detectCiroIntent } from '@/lib/ai/intent/ciro';
import { sql } from '@vercel/postgres';
import { getSystemPromptWithBrain } from '@/lib/brain/getSystemPromptWithBrain';

export async function POST(req: NextRequest) {
  const { prompt, userId, history } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectCiroIntent(prompt, true);

  // 🔍 Buscar configuración del usuario para Ciro
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
    console.warn('No assistant_settings found for Ciro:', err);
  }

  // 🧪 Logs de depuración
  console.log('📥 Prompt recibido:', prompt);
  console.log('👤 userId:', userId);
  console.log('🧠 Assistant ID: ciro');

  // 🧠 Generar prompt con contexto relevante del Brain
  const systemPrompt = await getSystemPromptWithBrain({
    assistantId: 'ciro',
    roleDescription: 'an SEO and performance AI assistant for ecommerce stores',
    tone: tone as 'friendly' | 'professional' | 'playful' | 'direct',
    detailed,
    userId,
    prompt
  });

  console.log('📡 systemPrompt generado:\n', systemPrompt);

  try {
    const output = await askCiro(prompt, intent, history, systemPrompt);
    return NextResponse.json({ output, tool: intent.tool, model: intent.model });
  } catch (err) {
    console.error('Ciro API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
