import { useState, useRef } from 'react';
import { fetchVotingInfo } from '../services/api';
import type { VotingInfo } from '../types';

const SUGGESTIONS = [
  'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu',
  'West Bengal', 'Gujarat', 'Rajasthan', 'Uttar Pradesh',
  'Bihar', 'Telangana',
];

export default function VotingInfoPage() {
  const [query, setQuery]     = useState('');
  const [result, setResult]   = useState<VotingInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSearch(searchQuery: string) {
    const q = searchQuery.trim();
    if (!q) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchVotingInfo(q);
      setResult(data);
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 404) {
        setError(`No information found for "${q}". Try a state name like "Delhi" or "Karnataka", or a 6-digit PIN code.`);
      } else if (status === 422) {
        setError('Please enter a valid city/state name (2–60 letters) or a 6-digit PIN code.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSearch(query);
  }

  function handleSuggestion(name: string) {
    setQuery(name);
    handleSearch(name);
    inputRef.current?.focus();
  }

  return (
    <div className="min-h-[70vh] bg-slate-50 py-12">
      <div className="mx-auto max-w-2xl px-4">

        {/* Page heading */}
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-extrabold text-slate-900">
            📍 Find My Voting Info
          </h1>
          <p className="text-slate-500">
            Enter your city, state, or 6-digit PIN code to get personalised voting
            resources for your region.
          </p>
        </div>

        {/* Search form */}
        <form
          onSubmit={handleSubmit}
          role="search"
          aria-label="Voting info search"
          className="flex gap-2"
        >
          <label htmlFor="voting-info-search" className="sr-only">
            City, state, or PIN code
          </label>
          <input
            id="voting-info-search"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Delhi, Karnataka, 110001…"
            autoComplete="off"
            disabled={loading}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm
                       shadow-sm transition focus:border-blue-500 focus:outline-none
                       focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
            aria-label="Enter city, state, or PIN code"
          />
          <button
            type="submit"
            disabled={loading || query.trim().length < 2}
            className="btn-primary px-6 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2" aria-live="polite">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
                Searching…
              </span>
            ) : (
              'Search'
            )}
          </button>
        </form>

        {/* Suggestions */}
        {!result && !loading && (
          <div className="mt-4" aria-label="Suggested regions">
            <p className="mb-2 text-xs font-medium text-slate-500">Popular regions:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs
                             font-medium text-slate-600 shadow-sm transition hover:border-blue-300
                             hover:bg-blue-50 hover:text-blue-700 focus-visible:outline"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Result card */}
        {result && (
          <div
            className="mt-8 animate-fade-in rounded-xl border border-slate-200 bg-white shadow-sm"
            aria-label={`Voting information for ${result.region}`}
          >
            {/* Card header */}
            <div className="rounded-t-xl bg-navy-800 px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">📍</span>
                <div>
                  <h2 className="text-xl font-bold">{result.region}</h2>
                  <p className="text-sm text-blue-200">{result.state}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-6">
              {/* Helpline */}
              <div className="flex items-center gap-3 rounded-lg bg-emerald-50 px-4 py-3">
                <span className="text-2xl" aria-hidden="true">📞</span>
                <div>
                  <p className="text-xs font-medium text-emerald-700">Voter Helpline</p>
                  <p className="text-2xl font-extrabold text-emerald-600">{result.voterHelpline}</p>
                </div>
              </div>

              {/* Primary action buttons */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href={result.pollingBoothFinderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center gap-2 py-3 text-center"
                >
                  🗳️ Find My Polling Booth
                </a>
                <a
                  href={result.stateElectionCommissionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center gap-2 py-3 text-center"
                >
                  🏛️ State Election Commission
                </a>
              </div>

              {/* Additional links */}
              {result.additionalLinks.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-slate-700">More Resources</h3>
                  <ul className="space-y-2">
                    {result.additionalLinks.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:underline focus-visible:outline"
                        >
                          <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tip */}
              {result.tip && (
                <div
                  role="note"
                  className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
                >
                  <span className="mt-0.5 flex-shrink-0 text-lg" aria-hidden="true">💡</span>
                  <p>{result.tip}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
