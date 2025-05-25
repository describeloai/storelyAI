import { NextRequest, NextResponse } from 'next/server';
import { askCiro } from '@/lib/ai/clients/askCiro'; // Asegúrate de que así se llama en tu cliente
import { detectCiroIntent } from '@/lib/ai/intent/ciro';

export async function POST(req: NextRequest) {
  const { prompt, userId, history } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectCiroIntent(prompt); // 👈 Esto se evalúa en CADA mensaje, como debe ser

  try {
    const output = await askCiro(prompt, intent, history);
 // 👈 Usa solo este intent para esta request
    return NextResponse.json({
      output,
      tool: intent.tool,
      model: intent.model,
    });
  } catch (err) {
    console.error('Ciro API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
