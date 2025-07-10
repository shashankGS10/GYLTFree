"use client";

import { useState, useEffect, useRef } from "react";
import { LLMFloatingStats } from "@/components/LLMFloatingStats";
import { LLMControls } from "@/components/LLMControls";
import { usePromptStore } from "@/store/usePromptStore";
import { useLLMStats } from "@/store/useLLMStats";
import { useChatStore } from "@/store/useChatStore";
import { PreviousChats } from "@/components/PreviousChats";
import SignOutButton from "@/components/SignOutButton";

export default function ChatPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Zustand stores
  const {
    startNewChat,
    addMessage,
    selectChat,
    getCurrentMessages,
    currentChatId,
  } = useChatStore();

  const {
    prompt,
    systemPrompt,
    hasNewPrompt,
    markUsed,
    configUpdated,
    markConfigUsed,
  } = usePromptStore();

  const { examples } = useLLMStats();

  const messages = getCurrentMessages();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !currentChatId) return;

    const userMsg = { sender: "user" as const, text: input };
    const transcript = [...messages];
    setInput("");
    setIsLoading(true);

    // Apply config message if needed
    if (configUpdated) {
      const configMsg = {
        sender: "config" as const,
        text: `⚙️ Configuration updated:\nPrompt: ${prompt}\nSystem Prompt: ${systemPrompt}`,
      };
      addMessage(currentChatId, configMsg);
      transcript.push(configMsg);
      markConfigUsed();
    }

    // Send user message
    addMessage(currentChatId, userMsg);
    transcript.push(userMsg);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          transcript,
          prompt,
          systemPrompt,
          examples,
        }),
      });

      const { assistantReply } = await res.json();
      const assistantMsg = {
        sender: "assistant" as const,
        text: assistantReply || "No response",
      };

      if (hasNewPrompt) {
        const markedMsg = {
          sender: "assistant" as const,
          text: assistantReply || "No response",
        };
        addMessage(currentChatId, markedMsg);
        markUsed();
      } else {
        addMessage(currentChatId, assistantMsg);
      }
    } catch (err) {
      console.error(err);
      addMessage(currentChatId, {
        sender: "assistant",
        text: "Error getting a response.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNewChat = () => {
    const newId = startNewChat();
    addMessage(newId, {
      sender: "assistant",
      text: "Welcome to your AI Smart Support. Please introduce yourself briefly.",
    });
  };

  const handleSelectChat = (chatId: string) => {
    selectChat(chatId);
  };

  return (
    <div className="bg-background text-foreground px-4 py-6 sm:px-6 md:px-8 mx-auto relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-4">
        {/* Left-hand side (LHS) */}
        <div className="hidden sm:block sm:w-1/4 w-max">
          <PreviousChats
        onStartNewChat={handleStartNewChat}
        onSelectChat={handleSelectChat}
        selectedChatId={currentChatId}
        chats={useChatStore.getState().chats.map(chat => ({
          ...chat,
          timestamp: chat.timestamp instanceof Date ? chat.timestamp.getTime() : chat.timestamp,
        }))}
          />
          <div className="mt-4">
          <LLMFloatingStats />
          </div>
          <div className="mt-4">
          <SignOutButton />
          </div>
        </div>

        {/* Center chat */}
        <div className="flex-1 sm:w-2/4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        HelpBot
          </h1>
          <div className="space-y-3 mb-4 overflow-y-auto max-h-[60vh] px-1 sm:px-0">
        {messages.map((msg, idx) => {
          if (msg.sender === "config") {
            return (
          <div
            key={idx}
            className="p-3 rounded-md bg-yellow-100 text-yellow-900 border border-yellow-300 text-sm italic max-w-full sm:max-w-md"
          >
            ⚙️ {msg.text}
          </div>
            );
          }

          return (
            <div
          key={idx}
          className={`p-3 rounded-2xl whitespace-pre-line break-words ${
            msg.sender === "user"
              ? "bg-blue-600 text-white self-end ml-auto"
              : "bg-muted text-muted-foreground"
          } max-w-[90%] sm:max-w-md`}
            >
          <strong>{msg.sender === "user" ? "You" : "AI"}:</strong>{" "}
          {msg.text}
            </div>
          );
        })}

        {isLoading && (
          <div className="p-3 rounded-xl bg-muted animate-pulse w-40">
            AI is thinking...
          </div>
        )}
        <div ref={bottomRef} />
          </div>

          {/* Input Field */}
          <div className="mt-4 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring"
          placeholder="Type your response..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-60"
        >
          Send
        </button>
          </div>
        </div>

        {/* Right-hand side (RHS) */}
        <div className="hidden sm:block sm:w-1/4">
          
          <LLMControls />
          
        </div>
      </div>
      </div>
  );
}
