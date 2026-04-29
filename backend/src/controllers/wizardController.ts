import { Request, Response, NextFunction } from 'express';
import { getVotingSteps } from '../services/wizardService';

export function votingSteps(req: Request, res: Response, next: NextFunction): void {
  try {
    const steps = getVotingSteps();
    res.status(200).json({ success: true, data: steps });
  } catch (error) {
    next(error);
  }
}
