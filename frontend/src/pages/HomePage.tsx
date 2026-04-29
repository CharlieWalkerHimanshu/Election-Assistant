import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

const FEATURES = [
  {
    icon: '🧭',
    title: 'Guided Voting Flow',
    desc: 'Step-by-step wizard that walks you through eligibility, registration, finding your booth, and voting day.',
    cta: 'Start Guide',
    path: ROUTES.WIZARD,
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50',
    ring: 'ring-blue-100',
  },
  {
    icon: '📅',
    title: 'Election Timeline',
    desc: 'Interactive visual timeline showing every phase — Registration, Campaign, Voting, and Result declaration.',
    cta: 'View Timeline',
    path: ROUTES.TIMELINE,
    color: 'from-emerald-500 to-emerald-700',
    bg: 'bg-emerald-50',
    ring: 'ring-emerald-100',
  },
  {
    icon: '🤖',
    title: 'AI Assistant',
    desc: 'Ask any election question in plain language. Powered by OpenAI, grounded with structured election data.',
    cta: 'Ask AI',
    path: ROUTES.CHAT,
    color: 'from-purple-500 to-purple-700',
    bg: 'bg-purple-50',
    ring: 'ring-purple-100',
  },
] as const;

const STATS = [
  { value: '4', label: 'Simple Steps' },
  { value: 'AI', label: 'Powered Answers' },
  { value: '100%', label: 'Free to Use' },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-navy-800 px-4 py-24 text-white"
        aria-label="Hero"
      >
        {/* Decorative background circles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-700/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-emerald-700/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-300 ring-1 ring-emerald-500/30">
            AI-Powered Civic Tool
          </span>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Navigate Your Vote{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              With Confidence
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-blue-100">
            Step-by-step voting guidance, interactive election timelines, and AI-powered Q&amp;A support —
            all in one place. Built for first-time voters and everyone in between.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate(ROUTES.WIZARD)}
              className="btn-primary px-8 py-3.5 text-base"
              aria-label="Start voting guide"
            >
              🧭 Start Voting Guide
            </button>
            <button
              onClick={() => navigate(ROUTES.CHAT)}
              className="btn-secondary px-8 py-3.5 text-base"
              aria-label="Ask AI assistant"
            >
              🤖 Ask AI Assistant
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────── */}
      <section className="bg-navy-800 py-6" aria-label="Stats">
        <ul className="mx-auto flex max-w-2xl justify-center gap-12 px-4" role="list">
          {STATS.map(({ value, label }) => (
            <li key={label} className="text-center">
              <div className="text-2xl font-extrabold text-white">{value}</div>
              <div className="text-xs text-blue-300">{label}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20" aria-labelledby="features-heading">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2
              id="features-heading"
              className="mb-3 text-3xl font-extrabold text-slate-900"
            >
              Everything You Need to Vote
            </h2>
            <p className="mx-auto max-w-xl text-slate-500">
              Three powerful tools — all free, all accessible, all designed to make your voting experience effortless.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {FEATURES.map(({ icon, title, desc, cta, path, bg, ring }) => (
              <article
                key={title}
                className={`card flex flex-col p-6 ${bg} ring-1 ${ring}`}
              >
                <div className="mb-4 text-4xl" aria-hidden="true">{icon}</div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">{desc}</p>
                <button
                  onClick={() => navigate(path)}
                  className="btn-outline self-start"
                  aria-label={`${cta} — ${title}`}
                >
                  {cta} →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section
        className="bg-gradient-to-r from-blue-700 to-navy-800 py-16 text-center text-white"
        aria-label="Call to action"
      >
        <div className="mx-auto max-w-xl px-4">
          <h2 className="mb-3 text-2xl font-extrabold">Your Vote. Your Voice. Your Right.</h2>
          <p className="mb-8 text-blue-200">
            Don't let the process stop you. We'll guide you every step of the way.
          </p>
          <button
            onClick={() => navigate(ROUTES.WIZARD)}
            className="btn-primary px-10 py-3.5 text-base"
            aria-label="Get started with voting guide"
          >
            Get Started — It's Free
          </button>
        </div>
      </section>
    </>
  );
}
