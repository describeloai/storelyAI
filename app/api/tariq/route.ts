import { NextRequest, NextResponse } from 'next/server';
import { askTariq } from '@/lib/ai/clients/askTariq';
import { detectTariqIntent } from '@/lib/ai/intent/tariq';
import { sql } from '@vercel/postgres';
import { getSystemPromptWithBrain } from '@/lib/brain/getSystemPromptWithBrain';

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
    console.warn('⚠️ No assistant_settings found for Tariq:', err);
  }

  // 🧪 Logs para verificación
  console.log('📥 Prompt recibido:', prompt);
  console.log('👤 userId:', userId);
  console.log('🧠 Assistant ID: tariq');

  // 🧠 Construir systemPrompt con contexto y estilo
  const systemPrompt = await getSystemPromptWithBrain({
    assistantId: 'tariq',
    roleDescription: 'an AI customer support assistant for ecommerce businesses',
    tone: tone as 'friendly' | 'professional' | 'playful' | 'direct',
    detailed,
    userId,
    prompt
  });

  console.log('📡 systemPrompt generado:\n', systemPrompt);

  try {
    const output = await askTariq(prompt, intent, history, systemPrompt);
    return NextResponse.json({
      output,
      tool: intent.tool,
      model: intent.model,
    });
  } catch (err) {
    console.error('❌ Tariq API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
