import type { VotingStep } from '../../types';

interface Props {
  step: VotingStep;
}

export default function WizardStep({ step }: Props) {
  return (
    <div className="animate-fade-in">
      {/* Step header */}
      <div className="mb-6 flex items-start gap-4">
        <div
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-2xl font-black text-white shadow"
          aria-hidden="true"
        >
          {step.step}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{step.title}</h2>
          <p className="mt-1 text-slate-500">{step.description}</p>
        </div>
      </div>

      {/* Details checklist */}
      <ul className="mb-4 space-y-3" aria-label={`Steps for: ${step.title}`}>
        {step.details.map((detail, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
              aria-hidden="true"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-sm leading-relaxed text-slate-700">{detail}</span>
          </li>
        ))}
      </ul>

      {/* Documents (if any) */}
      {step.documents && step.documents.length > 0 && (
        <div className="mb-4 rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-800">
            <span aria-hidden="true">📋</span> Required Documents
          </h3>
          <ul className="space-y-1.5" aria-label="Required documents">
            {step.documents.map((doc, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
                {doc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tip */}
      {step.tip && (
        <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200" role="note" aria-label="Tip">
          <p className="flex items-start gap-2 text-sm text-amber-800">
            <span aria-hidden="true">💡</span>
            <span>{step.tip}</span>
          </p>
        </div>
      )}
    </div>
  );
}
