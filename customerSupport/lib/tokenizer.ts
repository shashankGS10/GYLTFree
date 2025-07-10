// pages/api/count-tokens.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { encoding_for_model } = await import('@dqbd/tiktoken');
  const model = 'gpt-4o';
  const encoder = encoding_for_model(model);

  const input = req.body.input; // string or array of messages
  const text = Array.isArray(input) ? input.map((msg) => msg.content).join('\n') : input;
  const tokens = encoder.encode(text);

  encoder.free();

  res.status(200).json({ tokenCount: tokens.length });
}
