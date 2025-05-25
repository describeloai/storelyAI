import { NextRequest, NextResponse } from 'next/server';
import { askGPT } from '@/lib/ai/clients/askCiro';
import { detectCiroIntent } from '@/lib/ai/intent/ciro';

export async function POST(req: NextRequest) {
  const { prompt, userId, history } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectCiroIntent(prompt);

  try {
    const output = await askGPT(prompt, intent, history);
    return NextResponse.json({ output, tool: intent.tool, model: intent.model });
  } catch (err) {
    console.error('Ciro API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
