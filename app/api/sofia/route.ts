import { NextRequest, NextResponse } from 'next/server';
import { askSofia } from '@/lib/ai/clients/askSofia';
import { detectSofiaIntent } from '@/lib/ai/intent/sofia';

export async function POST(req: NextRequest) {
  const { prompt, userId, history } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectSofiaIntent(prompt, true);

  try {
    const output = await askSofia(prompt, intent, history);
    return NextResponse.json({ output, tool: intent.tool, model: intent.model });
  } catch (err) {
    console.error('Sofía API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
