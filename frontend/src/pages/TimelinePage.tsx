import TimelineCard from '../components/Timeline/TimelineCard';
import { useTimeline } from '../hooks/useTimeline';

export default function TimelinePage() {
  const { phases, loading, error } = useTimeline('india');

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center" aria-live="polite" aria-label="Loading timeline">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" aria-hidden="true" />
          <p className="text-slate-500">Loading election timeline…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4" role="alert">
        <div className="card max-w-sm p-8 text-center">
          <span className="mb-3 block text-4xl" aria-hidden="true">⚠️</span>
          <p className="text-slate-600">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary mt-4">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Page heading */}
        <div className="mb-14 text-center">
          <h1 className="mb-3 text-3xl font-extrabold text-slate-900">📅 Election Timeline</h1>
          <p className="mx-auto max-w-lg text-slate-500">
            Every phase of the Indian election process — from voter registration to result
            declaration. Hover over each phase for full details.
          </p>
        </div>

        {/* Horizontal timeline (scrollable on mobile) */}
        <div
          className="overflow-x-auto pb-4"
          role="region"
          aria-label="Election phases timeline"
        >
          <div className="relative flex min-w-max items-start justify-center gap-4 px-4 pt-4 lg:min-w-0">
            {/* Background connector line */}
            <div
              className="absolute left-[10%] right-[10%] top-8 h-px bg-blue-100"
              aria-hidden="true"
            />

            {phases.map((phase, i) => (
              <TimelineCard
                key={phase.phase}
                phase={phase}
                isLast={i === phases.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <p className="mt-8 text-center text-xs text-slate-400" aria-hidden="true">
          Hover over each phase card to view full details. Dates are indicative — check{' '}
          <a
            href="https://eci.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-600"
          >
            eci.gov.in
          </a>{' '}
          for official announcements.
        </p>
      </div>
    </div>
  );
}
