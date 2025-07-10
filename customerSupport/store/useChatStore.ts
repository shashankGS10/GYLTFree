import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { persist } from 'zustand/middleware';

type Message = {
sender: 'user' | 'assistant' | 'config';
  text: string;
};

type Feedback = {
  helpfulness: number;
  clarity: number;
  accuracy: number;
  notes: string;
};

type Variable = {
  name: string;
  value: string;
};

type Example = {
  input: string;
  output: string;
};

type Chat = {
  id: string;
  title: string;
  messages: Message[];
  snippet: string;
  timestamp: Date;
  prompt: string;
  systemPrompt: string;
  variables: Variable[];
  examples: Example[];
  feedback: Feedback[];
};

interface ChatStore {
  chats: Chat[];
  currentChatId: string | null;

  startNewChat: () => string;
  selectChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  updateChatTitle: (chatId: string, title: string) => void;

  addMessage: (chatId: string, message: Message) => void;
  updateChatConfig: (
    chatId: string,
    config: {
      prompt?: string;
      systemPrompt?: string;
      variables?: Variable[];
      examples?: Example[];
    }
  ) => void;
  addFeedbackToChat: (chatId: string, feedback: Feedback) => void;

  getCurrentMessages: () => Message[];
  getCurrentChat: () => Chat | null;
  getCurrentPromptConfig: () => {
    prompt: string;
    systemPrompt: string;
    variables: Variable[];
    examples: Example[];
  };
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: null,

      startNewChat: () => {
        const id = nanoid();
        const newChat: Chat = {
          id,
          title: 'Untitled Chat',
          messages: [],
          snippet: '',
          timestamp: new Date(),
          prompt: '',
          systemPrompt: '',
          variables: [],
          examples: [],
          feedback: [],
        };
        set((state) => ({
          chats: [...state.chats, newChat],
          currentChatId: id,
        }));
        return id;
      },

      selectChat: (chatId) => {
        set({ currentChatId: chatId });
      },

      deleteChat: (chatId) => {
        set((state) => {
          const filtered = state.chats.filter((chat) => chat.id !== chatId);
          const isCurrent = state.currentChatId === chatId;
          return {
            chats: filtered,
            currentChatId: isCurrent ? null : state.currentChatId,
          };
        });
      },

      updateChatTitle: (chatId, title) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, title } : chat
          ),
        }));
      },

      addMessage: (chatId, message) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [...chat.messages, message],
                  snippet: message.text.slice(0, 100),
                  timestamp: new Date(),
                }
              : chat
          ),
        }));
      },

      updateChatConfig: (chatId, config) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  prompt: config.prompt ?? chat.prompt,
                  systemPrompt: config.systemPrompt ?? chat.systemPrompt,
                  variables: config.variables ?? chat.variables,
                  examples: config.examples ?? chat.examples,
                }
              : chat
          ),
        }));
      },

      addFeedbackToChat: (chatId, feedback) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  feedback: [...chat.feedback, feedback],
                }
              : chat
          ),
        }));
      },

      getCurrentMessages: () => {
        const { chats, currentChatId } = get();
        const chat = chats.find((c) => c.id === currentChatId);
        return chat?.messages || [];
      },

      getCurrentChat: () => {
        const { chats, currentChatId } = get();
        return chats.find((c) => c.id === currentChatId) || null;
      },

      getCurrentPromptConfig: () => {
        const chat = get().chats.find((c) => c.id === get().currentChatId);
        return chat
          ? {
              prompt: chat.prompt,
              systemPrompt: chat.systemPrompt,
              variables: chat.variables,
              examples: chat.examples,
            }
          : {
              prompt: '',
              systemPrompt: '',
              variables: [],
              examples: [],
            };
      },
    }),
    {
      name: 'chat-store',
      // Fix hydration bug for `Date`
      version: 2,
      migrate: (persistedState: any, version: number) => {
        if (version < 2) {
          return {
            ...persistedState,
            chats: persistedState.chats.map((chat: any) => ({
              ...chat,
              timestamp: new Date(chat.timestamp),
            })),
          };
        }
        return persistedState;
      },
    }
  )
);
