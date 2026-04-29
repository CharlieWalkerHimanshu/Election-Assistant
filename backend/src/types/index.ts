export interface TimelinePhase {
  phase: string;
  date: string;
  description: string;
  details: string;
  icon: string;
  country: string;
}

export interface VotingStep {
  step: number;
  title: string;
  description: string;
  details: string[];
  documents?: string[];
  tip?: string;
}

export interface VotingInfoLink {
  label: string;
  url: string;
}

export interface VotingInfo {
  region: string;
  state: string;
  pollingBoothFinderUrl: string;
  stateElectionCommissionUrl: string;
  voterHelpline: string;
  additionalLinks: VotingInfoLink[];
  tip: string;
}
