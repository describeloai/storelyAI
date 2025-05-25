import { NextRequest, NextResponse } from 'next/server';
import { askThalia } from '@/lib/ai/clients/askThalia';
import { detectThaliaIntent } from '@/lib/ai/intent/thalia';

export async function POST(req: NextRequest) {
  const { prompt, userId, history } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectThaliaIntent(prompt); // Detecta herramienta y modelo

  try {
    const output = await askThalia(prompt, intent, history);
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
