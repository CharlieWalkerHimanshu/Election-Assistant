import { useState, type FormEvent, type KeyboardEvent } from 'react';

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: Props) {
  const [value, setValue] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t border-slate-200 bg-white px-4 py-3"
      aria-label="Send a message"
    >
      <label htmlFor="chat-input" className="sr-only">
        Type your election question
      </label>
      <textarea
        id="chat-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about voter registration, eligibility, polling booth..."
        rows={1}
        disabled={disabled}
        aria-disabled={disabled}
        className="flex-1 resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5
                   text-sm text-slate-900 placeholder-slate-400 transition-colors
                   focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2
                   focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ maxHeight: '120px' }}
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl
                   bg-blue-600 text-white shadow-sm transition-all duration-150
                   hover:bg-blue-700 hover:shadow-md active:scale-95
                   disabled:cursor-not-allowed disabled:opacity-40"
      >
        <svg className="h-4 w-4 translate-x-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </form>
  );
}
