import { useState, useEffect } from 'react';
import { fetchTimeline } from '../services/api';
import type { TimelinePhase } from '../types';

export function useTimeline(country = 'india') {
  const [phases, setPhases]   = useState<TimelinePhase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchTimeline(country)
      .then((data) => { if (!cancelled) setPhases(data); })
      .catch(() => {
        if (!cancelled) setError('Failed to load timeline. Please try again.');
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [country]);

  return { phases, loading, error };
}
