import type { TimelinePhase } from '../../types';

interface Props {
  phase: TimelinePhase;
  isLast: boolean;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function TimelineCard({ phase, isLast }: Props) {
  return (
    <div className="group relative flex flex-col items-center">
      {/* Connector line */}
      {!isLast && (
        <div
          className="absolute left-1/2 top-12 h-px w-full -translate-x-0 bg-blue-200 lg:top-12"
          aria-hidden="true"
        />
      )}

      {/* Icon circle */}
      <div
        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full
                   bg-navy-800 text-2xl shadow-lg ring-4 ring-white
                   transition-transform duration-200 group-hover:scale-110"
        aria-hidden="true"
      >
        {phase.icon}
      </div>

      {/* Card body */}
      <div className="card mt-4 w-full max-w-[220px] p-4 text-center transition-all duration-200 group-hover:-translate-y-1">
        {/* Date badge */}
        <span className="mb-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          {formatDate(phase.date)}
        </span>

        <h3 className="mb-1 text-sm font-bold text-slate-900">{phase.phase}</h3>
        <p className="mb-3 text-xs text-slate-500">{phase.description}</p>

        {/* Details — shown on hover/focus */}
        <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-40">
          <p className="border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-600">
            {phase.details}
          </p>
        </div>
      </div>
    </div>
  );
}
