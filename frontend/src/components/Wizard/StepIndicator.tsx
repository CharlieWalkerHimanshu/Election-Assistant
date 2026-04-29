interface Props {
  steps: { step: number; title: string }[];
  currentStep: number;
  onGoTo: (index: number) => void;
}

export default function StepIndicator({ steps, currentStep, onGoTo }: Props) {
  return (
    <nav aria-label="Voting guide steps" className="mb-8">
      <ol className="flex items-center justify-center gap-0">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive    = index === currentStep;

          return (
            <li key={step.step} className="flex items-center">
              <button
                onClick={() => onGoTo(index)}
                aria-label={`Step ${step.step}: ${step.title}${isCompleted ? ' (completed)' : isActive ? ' (current)' : ''}`}
                aria-current={isActive ? 'step' : undefined}
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full
                            text-sm font-bold transition-all duration-200 focus-visible:outline
                            ${
                              isCompleted
                                ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'
                                : isActive
                                ? 'bg-blue-700 text-white shadow-md ring-4 ring-blue-100'
                                : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                            }`}
              >
                {isCompleted ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.step
                )}
              </button>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-12 transition-colors duration-300 sm:w-20 ${
                    index < currentStep ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* Step label */}
      <p className="mt-3 text-center text-sm text-slate-500" aria-live="polite">
        Step {currentStep + 1} of {steps.length}
        {steps[currentStep] && (
          <> — <span className="font-medium text-slate-700">{steps[currentStep].title}</span></>
        )}
      </p>
    </nav>
  );
}
