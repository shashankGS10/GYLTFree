import { useState } from 'react';
import { useChatStore } from '@/store/useChatStore';

interface Chat {
  id: string;
  title: string;
  timestamp: number;
  snippet?: string;
}

interface PreviousChatsProps {
  chats: Chat[];
  selectedChatId: string | null;
  onStartNewChat: () => void;
  onSelectChat: (chatId: string) => void;
}

export const PreviousChats = ({
  chats,
  selectedChatId,
  onStartNewChat,
  onSelectChat,
}: PreviousChatsProps) => {
  const { updateChatTitle } = useChatStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState('');

  const handleRename = (chatId: string, newTitle: string) => {
    updateChatTitle(chatId, newTitle.trim() || 'Untitled Chat');
    setEditingId(null);
  };

  return (
    <div
      className="bg-black/80 text-white rounded-xl shadow-xl p-4 text-xs z-50 backdrop-blur-md border border-white/20 hover:scale-[1.01] transition cursor-move"
      draggable
    >
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Previous Chats</h2>
      <button
        onClick={onStartNewChat}
        className="text-xs bg-primary text-secondary px-2 py-1 rounded hover:bg-primary/90 transition"
      >
        New Chat
      </button>
      </div>

      {chats.length === 0 ? (
      <p className="text-sm text-white/60 italic">No previous chats yet.</p>
      ) : (
      <div className="space-y-2">
        {chats.map((chat) => (
        <div
          key={chat.id}
          className={`p-3 rounded cursor-pointer transition ${
          selectedChatId === chat.id
            ? 'bg-white/10 border border-white/20'
            : 'hover:bg-white/10'
          }`}
          role="button"
          tabIndex={0}
          onClick={() => onSelectChat(chat.id)}
          onKeyDown={(e) => e.key === 'Enter' && onSelectChat(chat.id)}
          aria-pressed={selectedChatId === chat.id}
          onDoubleClick={() => {
          setEditingId(chat.id);
          setDraftTitle(chat.title);
          }}
        >
          {editingId === chat.id ? (
          <input
            autoFocus
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onBlur={() => handleRename(chat.id, draftTitle)}
            onKeyDown={(e) => {
            if (e.key === 'Enter') handleRename(chat.id, draftTitle);
            if (e.key === 'Escape') setEditingId(null);
            }}
            className="w-full text-sm bg-white/10 text-white p-1 rounded outline-none"
          />
          ) : (
          <div className="font-medium text-sm truncate">{chat.title || 'Untitled Chat'}</div>
          )}

          <div className="text-[10px] text-white/70">
          {new Date(chat.timestamp).toLocaleDateString()}
          </div>
          <div className="text-[11px] text-white/60 truncate mt-1">
          {chat.snippet || 'No messages yet'}
          </div>
        </div>
        ))}
      </div>
      )}
    </div>
  );
};
