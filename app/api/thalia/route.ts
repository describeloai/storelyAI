import { NextRequest, NextResponse } from 'next/server';
import { askThalia } from '@/lib/ai/clients/askThalia';
import { detectThaliaIntent } from '@/lib/ai/intent/thalia';
import { sql } from '@vercel/postgres';
import { getSystemPromptWithBrain } from '@/lib/brain/getSystemPromptWithBrain';

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
    console.warn('⚠️ No assistant_settings found for Thalia:', err);
  }

  // 💬 Detectar si es el primer mensaje y si el prompt es trivial
  const isTrivialPrompt = /gracias|ok|vale|de nada|perfecto|👌|👍|😊|entendido/i.test(prompt.trim());
  const isFirstMessage = !history || history.length === 0;

  let systemPrompt = '';

  if (isFirstMessage) {
    // 👉 Solo incluir info de Account Settings al inicio
    systemPrompt = await getSystemPromptWithBrain({
      assistantId: 'thalia',
      roleDescription: 'an AI assistant specialized in ecommerce operations and management',
      tone: tone as 'friendly' | 'professional' | 'playful' | 'direct',
      detailed,
      userId,
      prompt,
      isFirstMessage: true,
      topK: 0, // NO buscar en el Brain
    });
  } else if (!isTrivialPrompt) {
    // 👉 Para mensajes normales, buscar chunks del Brain
    systemPrompt = await getSystemPromptWithBrain({
      assistantId: 'thalia',
      roleDescription: 'an AI assistant specialized in ecommerce operations and management',
      tone: tone as 'friendly' | 'professional' | 'playful' | 'direct',
      detailed,
      userId,
      prompt,
      isFirstMessage: false,
      topK: 2, // Buscar hasta 2 chunks
    });
  }

  console.log('📡 systemPrompt generado:\n', systemPrompt);

  try {
    const output = await askThalia(prompt, intent, history, systemPrompt);
    return NextResponse.json({
      output,
      tool: intent.tool,
      model: intent.model,
    });
  } catch (err) {
    console.error('❌ Thalia API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
