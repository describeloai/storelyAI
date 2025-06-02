import { NextRequest, NextResponse } from 'next/server';
import { askSofia } from '@/lib/ai/clients/askSofia';
import { detectSofiaIntent } from '@/lib/ai/intent/sofia';
import { sql } from '@vercel/postgres';
import { getSystemPromptWithBrain } from '@/lib/brain/getSystemPromptWithBrain';

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
    console.warn('⚠️ No assistant_settings found for user:', err);
  }

  // 🔍 Evitar recalcular prompt para mensajes triviales
  const isTrivialPrompt = /gracias|ok|vale|de nada|perfecto|👌|👍|😊|entendido/i.test(prompt.trim());
  const isFirstMessage = !history || history.length === 0;

  let systemPrompt = '';
  if (isFirstMessage || !isTrivialPrompt) {
    systemPrompt = await getSystemPromptWithBrain({
      assistantId: 'sofia',
      roleDescription: 'an AI marketing assistant for ecommerce stores',
      tone: tone as 'friendly' | 'professional' | 'playful' | 'direct',
      detailed,
      userId,
      prompt,
    });
  }

  console.log('📡 systemPrompt generado:\n', systemPrompt);

  try {
    const output = await askSofia(prompt, intent, history, systemPrompt);
    return NextResponse.json({ output, tool: intent.tool, model: intent.model });
  } catch (err) {
    console.error('❌ Sofía API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}