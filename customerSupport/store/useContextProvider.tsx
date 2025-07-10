import { create } from 'zustand';

interface Context {
  title: string;
  content: string;
}

interface ContextState {
  context: Context | null;
  setContext: (context: Context) => void;
}

export const useContextProvider = create<ContextState>((set) => ({
  context: null,
  setContext: (context) => set({ context }),
}));
