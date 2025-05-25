import { NextRequest, NextResponse } from 'next/server';
import { askEcho } from '@/lib/ai/clients/askEcho';
import { detectEchoIntent } from '@/lib/ai/intent/echo';

export async function POST(req: NextRequest) {
  const { prompt, userId, history } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const intent = detectEchoIntent(prompt);

  try {
    const output = await askEcho(prompt, intent, history);
    return NextResponse.json({ output, tool: intent.tool, model: intent.model });
  } catch (err) {
    console.error('Echo API error:', err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
