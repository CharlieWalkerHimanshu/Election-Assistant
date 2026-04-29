import { VotingInfo } from '../types';

// ── Data ──────────────────────────────────────────────────────────────────────
// Keyed by normalised region name (lowercase, trimmed).
// PIN code prefix → region key is handled separately in getVotingInfo().

const VOTING_INFO_DATA: VotingInfo[] = [
  {
    region: 'Delhi',
    state: 'Delhi (NCT)',
    pollingBoothFinderUrl: 'https://electoralsearch.eci.gov.in/',
    stateElectionCommissionUrl: 'https://ceodelhi.gov.in/',
    voterHelpline: '1950',
    additionalLinks: [
      { label: 'Voter Registration (Form 6)', url: 'https://voters.eci.gov.in/signup' },
      { label: 'Download Voter ID (e-EPIC)', url: 'https://voters.eci.gov.in/download-eepic' },
    ],
    tip: 'Delhi voters can use the NVSP portal or the Voter Helpline App to locate their polling station instantly.',
  },
  {
    region: 'Maharashtra',
    state: 'Maharashtra',
    pollingBoothFinderUrl: 'https://electoralsearch.eci.gov.in/',
    stateElectionCommissionUrl: 'https://ceo.maharashtra.gov.in/',
    voterHelpline: '1950',
    additionalLinks: [
      { label: 'Voter Registration (Form 6)', url: 'https://voters.eci.gov.in/signup' },
      { label: 'Download Voter ID (e-EPIC)', url: 'https://voters.eci.gov.in/download-eepic' },
    ],
    tip: 'Mumbai voters: ensure your name is on the electoral roll at ceo.maharashtra.gov.in before voting day.',
  },
  {
    region: 'Tamil Nadu',
    state: 'Tamil Nadu',
    pollingBoothFinderUrl: 'https://electoralsearch.eci.gov.in/',
    stateElectionCommissionUrl: 'https://www.elections.tn.gov.in/',
    voterHelpline: '1950',
    additionalLinks: [
      { label: 'Voter Registration (Form 6)', url: 'https://voters.eci.gov.in/signup' },
      { label: 'Download Voter ID (e-EPIC)', url: 'https://voters.eci.gov.in/download-eepic' },
    ],
    tip: 'Tamil Nadu has bilingual ballot papers (Tamil + English). Bring any government photo ID if your Voter ID is not available.',
  },
  {
    region: 'Karnataka',
    state: 'Karnataka',
    pollingBoothFinderUrl: 'https://electoralsearch.eci.gov.in/',
    stateElectionCommissionUrl: 'https://ceokarnataka.kar.nic.in/',
    voterHelpline: '1950',
    additionalLinks: [
      { label: 'Voter Registration (Form 6)', url: 'https://voters.eci.gov.in/signup' },
      { label: 'Download Voter ID (e-EPIC)', url: 'https://voters.eci.gov.in/download-eepic' },
    ],
    tip: 'Bengaluru voters can verify their polling booth details via the KarVOTE app or the state CEO portal.',
  },
  {
    region: 'West Bengal',
    state: 'West Bengal',
    pollingBoothFinderUrl: 'https://electoralsearch.eci.gov.in/',
    stateElectionCommissionUrl: 'https://ceowestbengal.nic.in/',
    voterHelpline: '1950',
    additionalLinks: [
      { label: 'Voter Registration (Form 6)', url: 'https://voters.eci.gov.in/signup' },
      { label: 'Download Voter ID (e-EPIC)', url: 'https://voters.eci.gov.in/download-eepic' },
    ],
    tip: 'West Bengal uses multi-phase polling. Check ECI.gov.in for your constituency\'s specific voting date.',
  },
  {
    region: 'Gujarat',
    state: 'Gujarat',
    pollingBoothFinderUrl: 'https://electoralsearch.eci.gov.in/',
    stateElectionCommissionUrl: 'https://ceo.gujarat.gov.in/',
    voterHelpline: '1950',
    additionalLinks: [
      { label: 'Voter Registration (Form 6)', url: 'https://voters.eci.gov.in/signup' },
      { label: 'Download Voter ID (e-EPIC)', url: 'https://voters.eci.gov.in/download-eepic' },
    ],
    tip: 'Gujarat voters can check their Electoral Photo ID Card status on the state CEO portal.',
  },
  {
    region: 'Rajasthan',
    state: 'Rajasthan',
    pollingBoothFinderUrl: 'https://electoralsearch.eci.gov.in/',
    stateElectionCommissionUrl: 'https://ceorajasthan.nic.in/',
    voterHelpline: '1950',
    additionalLinks: [
      { label: 'Voter Registration (Form 6)', url: 'https://voters.eci.gov.in/signup' },
      { label: 'Download Voter ID (e-EPIC)', url: 'https://voters.eci.gov.in/download-eepic' },
    ],
    tip: 'Rajasthan has a large number of first-time voters. Check your name on the voter list at least two weeks before election day.',
  },
  {
    region: 'Uttar Pradesh',
    state: 'Uttar Pradesh',
    pollingBoothFinderUrl: 'https://electoralsearch.eci.gov.in/',
    stateElectionCommissionUrl: 'https://ceouttarpradesh.nic.in/',
    voterHelpline: '1950',
    additionalLinks: [
      { label: 'Voter Registration (Form 6)', url: 'https://voters.eci.gov.in/signup' },
      { label: 'Download Voter ID (e-EPIC)', url: 'https://voters.eci.gov.in/download-eepic' },
    ],
    tip: 'UP holds multi-phase elections. Confirm your phase date on the ECI notification to know your specific voting day.',
  },
  {
    region: 'Bihar',
    state: 'Bihar',
    pollingBoothFinderUrl: 'https://electoralsearch.eci.gov.in/',
    stateElectionCommissionUrl: 'https://ceobihar.nic.in/',
    voterHelpline: '1950',
    additionalLinks: [
      { label: 'Voter Registration (Form 6)', url: 'https://voters.eci.gov.in/signup' },
      { label: 'Download Voter ID (e-EPIC)', url: 'https://voters.eci.gov.in/download-eepic' },
    ],
    tip: 'Bihar voters: ensure you check the phase schedule. Multiple constituencies vote on different dates.',
  },
  {
    region: 'Telangana',
    state: 'Telangana',
    pollingBoothFinderUrl: 'https://electoralsearch.eci.gov.in/',
    stateElectionCommissionUrl: 'https://ceotelangana.nic.in/',
    voterHelpline: '1950',
    additionalLinks: [
      { label: 'Voter Registration (Form 6)', url: 'https://voters.eci.gov.in/signup' },
      { label: 'Download Voter ID (e-EPIC)', url: 'https://voters.eci.gov.in/download-eepic' },
    ],
    tip: 'Telangana voters in Hyderabad can use the GHMC electoral roll search for ward-level polling info.',
  },
];

// PIN code prefix → region name (first 2 digits of 6-digit Indian PIN code)
const PIN_PREFIX_MAP: Record<string, string> = {
  '11': 'Delhi',
  '40': 'Maharashtra',
  '41': 'Maharashtra',
  '42': 'Maharashtra',
  '43': 'Maharashtra',
  '44': 'Maharashtra',
  '60': 'Tamil Nadu',
  '62': 'Tamil Nadu',
  '63': 'Tamil Nadu',
  '64': 'Tamil Nadu',
  '56': 'Karnataka',
  '57': 'Karnataka',
  '58': 'Karnataka',
  '59': 'Karnataka',
  '70': 'West Bengal',
  '71': 'West Bengal',
  '72': 'West Bengal',
  '73': 'West Bengal',
  '38': 'Gujarat',
  '39': 'Gujarat',
  '36': 'Gujarat',
  '30': 'Rajasthan',
  '31': 'Rajasthan',
  '32': 'Rajasthan',
  '33': 'Rajasthan',
  '20': 'Uttar Pradesh',
  '21': 'Uttar Pradesh',
  '22': 'Uttar Pradesh',
  '24': 'Uttar Pradesh',
  '80': 'Bihar',
  '81': 'Bihar',
  '82': 'Bihar',
  '83': 'Bihar',
  '84': 'Bihar',
  '85': 'Bihar',
  '50': 'Telangana',
};

// ── Service ───────────────────────────────────────────────────────────────────

/**
 * Look up voting info by city/state name or 6-digit PIN code.
 * Returns undefined if no match is found.
 */
export function getVotingInfo(query: string): VotingInfo | undefined {
  const trimmed = query.trim();

  // PIN code path: exactly 6 digits
  if (/^\d{6}$/.test(trimmed)) {
    const prefix = trimmed.slice(0, 2);
    const regionName = PIN_PREFIX_MAP[prefix];
    if (!regionName) return undefined;
    return VOTING_INFO_DATA.find(
      (v) => v.region.toLowerCase() === regionName.toLowerCase()
    );
  }

  // Name path: case-insensitive partial match against region or state
  const lower = trimmed.toLowerCase();
  return VOTING_INFO_DATA.find(
    (v) =>
      v.region.toLowerCase().includes(lower) ||
      v.state.toLowerCase().includes(lower)
  );
}

export function getAllRegions(): string[] {
  return VOTING_INFO_DATA.map((v) => v.region);
}
