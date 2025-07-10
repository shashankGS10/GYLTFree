import OpenAI from 'openai';
import { useLLMStats } from '@/store/useLLMStats';
import { useContextProvider } from '@/store/useContextProvider';

// --- Constants ---
const CONTEXT_MAX_LENGTH = 12000;
const DEFAULT_OPENAI_MODEL = 'gpt-4o'; // As per pricing, gpt-4o is the default fallback

// Pricing per 1K tokens (May 2025)
const OPENAI_PRICES: Record<string, { input: number; output: number }> = {
  'gpt-4o': { input: 0.0025, output: 0.005 },
  'gpt-4o-mini': { input: 0.00015, output: 0.0006 },
  'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 },
  // Add other models if needed
};

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Removed '!' for runtime check
});

// --- Helper Functions ---

/**
 * Replaces variables in the prompt string with their corresponding values.
 * @param prompt The prompt template string with {{variable}} placeholders
 * @param variables Array of variable objects with name and value
 * @returns The prompt string with variables interpolated
 */
export function interpolateVariables(prompt: string, variables: { name: string; value: string }[]): string {
  return variables.reduce(
    (result, variable) => result.replace(new RegExp(`{{${variable.name}}}`, 'g'), variable.value),
    prompt
  );
}

/**
 * Calculates estimated cost in USD based on token usage and model pricing.
 * Pricing updated for May 2025.
 * @param model Model name string
 * @param promptTokens Number of prompt tokens used
 * @param completionTokens Number of completion tokens used
 * @returns Estimated cost in USD rounded to 6 decimals
 */
function getCostEstimate(
  model: string, // Enforce string type for model
  promptTokens: number,
  completionTokens: number
): number {
  const pricing = OPENAI_PRICES[model] || OPENAI_PRICES[DEFAULT_OPENAI_MODEL];
  const cost = (promptTokens * pricing.input + completionTokens * pricing.output) / 1000;

  return parseFloat(cost.toFixed(6));
}

// --- Main Function ---

/**
 * Creates a chat completion using OpenAI's chat API, tracks usage and updates stats.
 * @param userMessage The user input message string
 * @param transcript Array of previous messages in conversation with sender and text
 * @returns The assistant's response text
 */
export async function createChatCompletion(
  userMessage: string,
  transcript: { sender: 'user' | 'assistant'; text: string }[] = []
): Promise<string> {
  // Validate API Key at runtime
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY environment variable is not set.');
    throw new Error('OpenAI API key is missing.');
  }

  const llmStats = useLLMStats.getState();
  const { context } = useContextProvider.getState();

  
  const systemPrompts: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

  if (context) {
    systemPrompts.push({
      role: 'system',
      content: `Use this documentation for context during the AI Support:\n\n[${context.title}]\n\n${context.content.slice(
        0,
        CONTEXT_MAX_LENGTH
      )}`,
    });
  }

  systemPrompts.push({
    role: 'system',
    content:
      'You are a professional AI Customer Support. Ask follow-up questions based on the conversation. Provide feedback if asked. Stay within scope.',
  });

  // Construct the messages array for the API call
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    ...systemPrompts,
    // Explicitly cast each mapped message to ensure it matches OpenAI's expected types
    ...transcript.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    }) as OpenAI.Chat.Completions.ChatCompletionMessageParam),
    { role: 'user', content: userMessage } as OpenAI.Chat.Completions.ChatCompletionMessageParam,
  ];

  try {
    const response = await openai.chat.completions.create({
      model: llmStats.config.model || DEFAULT_OPENAI_MODEL,
      messages,
      temperature: llmStats.config.temperature,
      max_tokens: llmStats.config.maxTokens,
      top_p: llmStats.config.topP,
      frequency_penalty: llmStats.config.frequencyPenalty ?? 0,
      presence_penalty: llmStats.config.presencePenalty ?? 0,
    });

    const usage = response.usage ?? {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0,
    };

    const cost = getCostEstimate(
      llmStats.config.model || DEFAULT_OPENAI_MODEL, // Ensure model is passed
      usage.prompt_tokens,
      usage.completion_tokens
    );

    llmStats.updateStats({
      promptTokens: usage.prompt_tokens,
      completionTokens: usage.completion_tokens,
      totalTokens: usage.total_tokens,
      estimatedCostUSD: cost,
    });

    return response.choices[0]?.message?.content ?? 'No valid response received.';
  } catch (err) {
    console.error('[OpenAI Chat Error]', err);
    // Provide a more user-friendly error message if possible or rethrow with more context
    throw new Error('Failed to get a response from OpenAI. Please check your API key or try again later.');
  }
}