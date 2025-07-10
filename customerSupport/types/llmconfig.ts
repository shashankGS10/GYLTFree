// @/types/llmConfig.ts

/**
 * Defines the configuration parameters for Large Language Model (LLM) API calls.
 * This interface is designed to cover common settings for various LLM providers.
 */
export interface LLMConfig {
  // Core Model Selection
  model: string; // The specific LLM model to use (e.g., 'gpt-4o', 'claude-3-opus-20240229')

  // Generation Parameters
  temperature: number; // Controls randomness; lower values mean more deterministic outputs (0.0 - 2.0)
  maxTokens: number; // The maximum number of tokens to generate in the completion
  topP: number; // Nucleus sampling: only considers tokens with a cumulative probability mass (0.0 - 1.0)
  frequencyPenalty?: number; // Penalizes new tokens based on their existing frequency in the text so far (-2.0 - 2.0)
  presencePenalty?: number; // Penalizes new tokens based on whether they appear in the text so far (-2.0 - 2.0)

  // Optional Generation Parameters
  topK?: number; // Top-K sampling: only considers the top K most likely tokens (provider-specific, typically an integer)
  stopSequences?: string[]; // Up to 4 sequences where the API will stop generating further tokens
  logitBias?: Record<string, number>; // Modifies the likelihood of specified tokens appearing in the completion

  // Context & Control Parameters (often custom or derived)
  responseLengthLimit?: number; // A conceptual limit for the total response length (might be derived from maxTokens)
  contextWindowSize?: number; // The maximum number of tokens the model can consider for context (input + output)

  // Tone & Style Parameters (often used in prompt engineering, less often direct API params)
  tone?: string; // e.g., 'professional', 'casual', 'friendly'
  style?: string; // e.g., 'concise', 'detailed', 'narrative'
  difficulty?: string; // e.g., 'beginner', 'intermediate', 'advanced'
  language?: string; // Target language for the response (e.g., 'English', 'Spanish')

  // Note: 'prompt' property was removed as it's typically part of the message array,
  // not a fixed config parameter for the LLM itself.
}