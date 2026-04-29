import type { ChatMessage } from '../../types';

interface Props {
  message: ChatMessage;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatBubble({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex animate-slide-up ${isUser ? 'justify-end' : 'justify-start'}`}
      aria-label={`${isUser ? 'You' : 'Election Navigator'}: ${message.content}`}
    >
      {/* AI avatar */}
      {!isUser && (
        <div
          className="mr-2 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy-800 text-sm"
          aria-hidden="true"
        >
          🗳️
        </div>
      )}

      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
            isUser
              ? 'rounded-br-sm bg-blue-600 text-white'
              : 'rounded-bl-sm bg-white text-slate-800 ring-1 ring-slate-200'
          }`}
        >
          {/* Preserve line breaks from API response */}
          {message.content.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < message.content.split('\n').length - 1 && <br />}
            </span>
          ))}
        </div>
        <span className="px-1 text-xs text-slate-400" aria-hidden="true">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
