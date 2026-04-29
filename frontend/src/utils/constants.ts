export const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

export const ROUTES = {
  HOME:     '/',
  WIZARD:   '/wizard',
  TIMELINE: '/timeline',
  CHAT:     '/chat',
} as const;

export const QUICK_QUESTIONS = [
  'How do I register to vote?',
  'What documents do I need to vote?',
  'How do I find my polling booth?',
  'What is the minimum age to vote?',
  'Can I vote without a Voter ID card?',
] as const;

export const NAV_LINKS = [
  { label: 'Home',         path: ROUTES.HOME },
  { label: 'Voting Guide', path: ROUTES.WIZARD },
  { label: 'Timeline',     path: ROUTES.TIMELINE },
  { label: 'Ask AI',       path: ROUTES.CHAT },
] as const;
