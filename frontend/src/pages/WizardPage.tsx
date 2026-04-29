import StepIndicator from '../components/Wizard/StepIndicator';
import WizardStep from '../components/Wizard/WizardStep';
import { useWizard } from '../hooks/useWizard';

export default function WizardPage() {
  const { steps, currentStep, loading, error, goNext, goBack, goTo } = useWizard();

  const isFirst = currentStep === 0;
  const isLast  = currentStep === steps.length - 1;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center" aria-live="polite" aria-label="Loading voting steps">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" aria-hidden="true" />
          <p className="text-slate-500">Loading voting guide…</p>
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
      <div className="mx-auto max-w-2xl px-4">
        {/* Page heading */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">🧭 How Do I Vote?</h1>
          <p className="mt-2 text-slate-500">
            Follow these {steps.length} steps to cast your vote with confidence.
          </p>
        </div>

        {/* Step progress indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} onGoTo={goTo} />

        {/* Step content card */}
        <div className="card p-8">
          {steps[currentStep] && <WizardStep step={steps[currentStep]} />}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <button
              onClick={goBack}
              disabled={isFirst}
              aria-label="Go to previous step"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5
                         text-sm font-medium text-slate-600 transition-all hover:border-slate-400
                         hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Back
            </button>

            <span className="text-xs text-slate-400" aria-hidden="true">
              {currentStep + 1} / {steps.length}
            </span>

            {isLast ? (
              <a
                href="https://voters.eci.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label="Register to vote on the official ECI portal"
              >
                Register Now ↗
              </a>
            ) : (
              <button
                onClick={goNext}
                aria-label="Go to next step"
                className="btn-primary"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
