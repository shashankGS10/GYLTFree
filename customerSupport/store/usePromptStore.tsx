import { create } from 'zustand';

interface Variable {
  name: string;
  value: string;
}

interface Example {
  input: string;
  output: string;
}

interface PromptState {
  prompt: string;
  systemPrompt: string;
  hasNewPrompt: boolean;
  variables: Variable[];
  examples: Example[];
  setPrompt: (prompt: string) => void;
  setSystemPrompt: (systemPrompt: string) => void;
  markUsed: () => void;
  setVariables: (vars: Variable[]) => void;
  setExamples: (exs: Example[]) => void;
  markConfigUpdated: () => void;
  markConfigUsed: () => void; 
  configUpdated: boolean;  
}


export const usePromptStore = create<PromptState>((set) => ({
  prompt: '',
  systemPrompt: '',
  hasNewPrompt: false,
  configUpdated: false,
  variables: [],
  
  examples: [],
  setPrompt: (prompt) => set({ prompt, hasNewPrompt: true }),
  setSystemPrompt: (systemPrompt) => set({ systemPrompt, hasNewPrompt: true }),
  markUsed: () => set({ hasNewPrompt: false }),
  setVariables: (vars) => set({ variables: vars }),
  setExamples: (exs) => set({ examples: exs }),  markConfigUpdated: () => set({ configUpdated: true }),
  markConfigUsed: () => set({ configUpdated: false }),
}));
