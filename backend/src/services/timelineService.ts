import { TimelinePhase } from '../types';

// Static, structured election timeline data.
// Keeping data here (not hardcoded in routes) makes it easy to swap to a DB later.
const TIMELINE_DATA: TimelinePhase[] = [
  {
    phase: 'Registration',
    date: '2026-04-01',
    description: 'Last date to register as a voter',
    details:
      'All eligible citizens must enroll on the electoral roll before this date. Visit voters.eci.gov.in or submit Form 6 at your local BLO office.',
    icon: '📝',
    country: 'india',
  },
  {
    phase: 'Campaign',
    date: '2026-04-15',
    description: 'Official campaign period begins',
    details:
      'Political parties and candidates begin their official campaigns. The Model Code of Conduct is in effect. Campaign ends 48 hours before polling day.',
    icon: '📣',
    country: 'india',
  },
  {
    phase: 'Voting',
    date: '2026-05-01',
    description: 'Polling day — cast your vote',
    details:
      'Polling booths open 7 AM – 6 PM. Carry an approved photo ID (Voter ID, Aadhaar, Passport, PAN card, Driving Licence). Your finger will be inked after voting.',
    icon: '🗳️',
    country: 'india',
  },
  {
    phase: 'Results',
    date: '2026-05-04',
    description: 'Vote counting and result declaration',
    details:
      'Counting begins early morning. Results are declared constituency-by-constituency. The winning candidate with the most votes (FPTP) is declared elected.',
    icon: '📊',
    country: 'india',
  },
];

/**
 * Returns all timeline phases, optionally filtered by country (default: india).
 * Country matching is case-insensitive.
 */
export function getTimeline(country?: string): TimelinePhase[] {
  const target = (country ?? 'india').toLowerCase().trim();
  return TIMELINE_DATA.filter((p) => p.country === target);
}
