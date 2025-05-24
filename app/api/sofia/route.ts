import { NextRequest, NextResponse } from 'next/server';
import { askGPT } from '@/lib/ai/clients';
import { detectSofiaIntent } from '@/lib/ai/intent/sofia';

export async function POST(req: NextRequest) {
  const { prompt, userId } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectSofiaIntent(prompt); // analiza si se usa GPT o Claude

  try {
    const output = await askGPT(prompt, intent); // Claude vendrá después
    return NextResponse.json({ output, tool: intent.tool, model: 'GPT-4' });
  } catch (err) {
    console.error('Sofía API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
