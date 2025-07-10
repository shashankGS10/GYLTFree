import { create } from 'zustand';
import { LLMConfig } from '@/types/llmconfig'; 

type TokenStats = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUSD: number;
};


interface Variable {
  name: string;
  value: string;
}

interface Example {
  input: string;
  output: string;
}

type LLMStatsState = {
  stats: TokenStats;
  config: LLMConfig;
  variables: Variable[];
  examples: Example[];
  feedback: { helpfulness: number; clarity: number; accuracy: number; notes?: string }[];
  updateStats: (stats: Partial<TokenStats>) => void;
  updateConfig: (config: Partial<LLMConfig>) => void;
  setVariables: (vars: Variable[]) => void;
  setExamples: (exs: Example[]) => void;
  resetStats: () => void;
  addFeedback: (fb: LLMStatsState['feedback'][0]) => void;
};

export const useLLMStats = create<LLMStatsState>((set) => ({
  stats: {
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    estimatedCostUSD: 0,
  },
  config: {
    model: 'gpt-4o',
    temperature: 0.7,
    maxTokens: 512,
    topP: 1.0,
  },
  variables: [],
  examples: [],
  feedback: [],
  addFeedback: (fb) =>
    set((state) => ({
      feedback: [...state.feedback, fb],
    })),
  updateStats: (newStats) =>
    set((state) => ({
      stats: { ...state.stats, ...newStats },
    })),
  updateConfig: (newConfig) =>
    set((state) => ({
      config: { ...state.config, ...newConfig },
    })),
  setVariables: (vars) => set({ variables: vars }),
  setExamples: (exs) => set({ examples: exs }),
  resetStats: () =>
    set({
      stats: {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        estimatedCostUSD: 0,
      },
    }),
}));
