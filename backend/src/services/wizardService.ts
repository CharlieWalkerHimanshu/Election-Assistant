import { VotingStep } from '../types';

// Static, structured step-by-step voting guide.
const VOTING_STEPS: VotingStep[] = [
  {
    step: 1,
    title: 'Check Eligibility',
    description: 'Confirm you meet the requirements to vote in India.',
    details: [
      'Must be an Indian citizen',
      'Must be at least 18 years old on the qualifying date (1st January of the revision year)',
      'Must be ordinarily resident in the constituency',
      'Must not be disqualified under any election law',
    ],
    tip: 'Not sure about your eligibility? Call the Voter Helpline at 1950.',
  },
  {
    step: 2,
    title: 'Register to Vote',
    description: 'Enroll on the Electoral Roll to get your Voter ID (EPIC card).',
    details: [
      'Visit https://voters.eci.gov.in or use the Voter Helpline App',
      'Fill Form 6 for new registration or Form 8 for corrections',
      'Submit online or at your local BLO (Booth Level Officer) office',
      'Track your application status using your reference number',
    ],
    documents: [
      'Age proof: Birth certificate, 10th marksheet, Passport, or Aadhaar',
      'Address proof: Aadhaar, Passport, utility bill, bank passbook, or rent agreement',
      'Recent passport-size photograph',
    ],
    tip: 'Registration usually closes 30 days before polling day.',
  },
  {
    step: 3,
    title: 'Find Your Polling Booth',
    description: 'Locate the polling booth where you are registered to vote.',
    details: [
      'Check your polling booth at https://voters.eci.gov.in',
      'Use the Voter Helpline App and enter your Voter ID number',
      'Call 1950 (Voter Helpline) for assistance',
      'Booth details are also printed on your Voter ID card',
    ],
    tip: 'You must vote at YOUR registered booth — you cannot vote at any booth.',
  },
  {
    step: 4,
    title: 'Voting Day — Cast Your Vote',
    description: 'What to do on polling day.',
    details: [
      'Polling hours are typically 7 AM – 6 PM (check your local schedule)',
      'Carry an approved photo ID: Voter ID (EPIC), Aadhaar, Passport, PAN card, Driving Licence, MNREGA job card, or bank passbook with photo',
      'Join the queue at your polling booth — a token/slip will be given',
      'A polling officer will verify your identity and mark your name off the roll',
      'Your left index finger will be inked with indelible ink',
      'Proceed to the EVM (Electronic Voting Machine) booth — it is secret',
      'Press the blue button next to your chosen candidate',
      'A VVPAT (paper slip) will be shown for 7 seconds to confirm your vote',
    ],
    tip: 'You cannot use a mobile phone inside the voting booth.',
  },
];

/** Returns the complete step-by-step voting guide. */
export function getVotingSteps(): VotingStep[] {
  return VOTING_STEPS;
}
