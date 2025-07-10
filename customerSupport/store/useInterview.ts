import { create } from 'zustand';

type Message = {
  role: 'user' | 'ai';
  text: string;
};


type InterviewState = {
  isRecording: boolean;
  isThinking: boolean;
  transcript: Message[];
  aiReply: string;
  error: string | null;
  startRecording: () => void;
  stopRecording: () => void;
  addUserMessage: (text: string) => void;
  addAiMessage: (text: string) => void;
};

export const useInterview = create<InterviewState>((set) => ({
  isRecording: false,
  isThinking: false,
  transcript: [],
  aiReply: '',
  error: null,
  startRecording: () => set({ isRecording: true }),
  stopRecording: () => set({ isRecording: false }),
  addUserMessage: (text) =>
    set((state) => ({
      transcript: [...state.transcript, { role: 'user', text }],
    })),
  addAiMessage: (text) =>
    set((state) => ({
      transcript: [...state.transcript, { role: 'ai', text }],
      aiReply: text,
    })),
}));
