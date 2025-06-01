import { NextRequest, NextResponse } from 'next/server';
import { askMara } from '@/lib/ai/clients/askMara';
import { detectMaraIntent } from '@/lib/ai/intent/mara';
import { sql } from '@vercel/postgres';
import { getSystemPromptWithBrain } from '@/lib/brain/getSystemPromptWithBrain';

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
    console.warn('⚠️ No assistant_settings found for Mara:', err);
  }

  // 🧪 Logs para verificación
  console.log('📥 Prompt recibido:', prompt);
  console.log('👤 userId:', userId);
  console.log('🧠 Assistant ID: mara');

  // 🧠 Construir prompt con contexto y estilo
  const systemPrompt = await getSystemPromptWithBrain({
    assistantId: 'mara',
    roleDescription: 'an AI copywriter for ecommerce stores',
    tone: tone as 'friendly' | 'professional' | 'playful' | 'direct',
    detailed,
    userId,
    prompt
  });

  console.log('📡 systemPrompt generado:\n', systemPrompt);

  try {
    const output = await askMara(prompt, intent, history, systemPrompt);
    return NextResponse.json({
      output,
      tool: intent.tool,
      model: intent.model,
    });
  } catch (err) {
    console.error('❌ Mara API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
