/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { message, transcript, systemPrompt, examples } = await request.json();

    // Build messages array based on your logic
    const messages = [
      { role: 'system', content: systemPrompt },
      ...examples.flatMap((ex: any) => [
        { role: 'user', content: ex.input },
        { role: 'assistant', content: ex.output },
      ]),
      ...transcript.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      })),
      { role: 'user', content: message },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 1,
      max_tokens: 512,
      top_p: 1,
    });

    return NextResponse.json({ assistantReply: response.choices[0].message?.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'OpenAI request failed' }, { status: 500 });
  }
}
