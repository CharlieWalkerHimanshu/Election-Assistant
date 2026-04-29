export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-2" aria-label="Election Navigator is typing" aria-live="polite">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy-800 text-sm" aria-hidden="true">
        🗳️
      </div>
      <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center gap-1" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-slate-400"
              style={{ animation: `pulseDot 1.4s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
