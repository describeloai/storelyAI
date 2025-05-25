import { NextRequest, NextResponse } from 'next/server';
import { askGPT } from '@/lib/ai/clients/askSofia';
import { detectSofiaIntent } from '@/lib/ai/intent/sofia';

export async function POST(req: NextRequest) {
  const { prompt, userId, history } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectSofiaIntent(prompt);

  try {
    const output = await askGPT(prompt, intent, history);
    return NextResponse.json({ output, tool: intent.tool, model: intent.model });
  } catch (err) {
    console.error('Sofía API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
