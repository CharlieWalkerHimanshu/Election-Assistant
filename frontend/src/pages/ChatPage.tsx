import { useEffect, useRef } from 'react';
import ChatBubble from '../components/Chat/ChatBubble';
import ChatInput from '../components/Chat/ChatInput';
import TypingIndicator from '../components/Chat/TypingIndicator';
import { useChat } from '../hooks/useChat';
import { QUICK_QUESTIONS } from '../utils/constants';

export default function ChatPage() {
  const { messages, isTyping, sendMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col bg-slate-100">
      {/* Chat header */}
      <div className="flex items-center gap-3 bg-navy-800 px-4 py-3 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-lg" aria-hidden="true">
          🗳️
        </div>
        <div>
          <h1 className="text-sm font-bold text-white">Election Navigator AI</h1>
          <p className="flex items-center gap-1.5 text-xs text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Online — ask me anything about elections
          </p>
        </div>
      </div>

      {/* Message list */}
      <div
        className="flex-1 overflow-y-auto px-4 py-6"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        aria-atomic="false"
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} aria-hidden="true" />
        </div>
      </div>

      {/* Quick questions */}
      {messages.length <= 1 && !isTyping && (
        <div className="border-t border-slate-200 bg-white px-4 py-3" aria-label="Quick questions">
          <p className="mb-2 text-xs font-medium text-slate-500">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs
                           font-medium text-blue-700 transition-colors hover:bg-blue-100
                           focus-visible:outline"
                aria-label={`Ask: ${q}`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="mx-auto w-full max-w-2xl">
        <ChatInput onSend={sendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}
