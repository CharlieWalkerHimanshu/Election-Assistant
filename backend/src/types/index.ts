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
