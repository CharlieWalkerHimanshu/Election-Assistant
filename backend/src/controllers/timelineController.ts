import { Request, Response, NextFunction } from 'express';
import { getTimeline } from '../services/timelineService';

export function timeline(req: Request, res: Response, next: NextFunction): void {
  try {
    const country = typeof req.query.country === 'string' ? req.query.country : undefined;
    const phases = getTimeline(country);

    if (phases.length === 0) {
      res.status(404).json({
        success: false,
        message: `No timeline data found for country: "${country ?? 'india'}". Currently supported: india.`,
      });
      return;
    }

    res.status(200).json({ success: true, data: phases });
  } catch (error) {
    next(error);
  }
}
