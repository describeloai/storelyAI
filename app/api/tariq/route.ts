import { NextRequest, NextResponse } from 'next/server';
import { askTariq } from '@/lib/ai/clients/askTariq';
import { detectTariqIntent } from '@/lib/ai/intent/tariq';

export async function POST(req: NextRequest) {
  const { prompt, userId, history } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectTariqIntent(prompt); // Detecta herramienta y modelo

  try {
    const output = await askTariq(prompt, intent, history);
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
