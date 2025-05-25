import { NextRequest, NextResponse } from 'next/server';
import { askMara } from '@/lib/ai/clients/askMara';
import { detectMaraIntent } from '@/lib/ai/intent/mara';

export async function POST(req: NextRequest) {
  const { prompt, userId, history } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectMaraIntent(prompt, true); // Detecta herramienta y modelo

  try {
    const output = await askMara(prompt, intent, history);
    return NextResponse.json({
      output,
      tool: intent.tool,
      model: intent.model,
    });
  } catch (err) {
    console.error('Mara API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
