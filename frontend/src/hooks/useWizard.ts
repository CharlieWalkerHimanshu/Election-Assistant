import { useState, useEffect } from 'react';
import { fetchVotingSteps } from '../services/api';
import type { VotingStep } from '../types';

export function useWizard() {
  const [steps, setSteps]         = useState<VotingStep[]>([]);
  const [currentStep, setCurrent] = useState(0);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  useEffect(() => {
    fetchVotingSteps()
      .then(setSteps)
      .catch(() => setError('Failed to load voting steps. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const goNext = () => setCurrent((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setCurrent((s) => Math.max(s - 1, 0));
  const goTo   = (i: number) => setCurrent(i);

  return { steps, currentStep, loading, error, goNext, goBack, goTo };
}
