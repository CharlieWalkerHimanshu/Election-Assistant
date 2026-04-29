import { Request, Response, NextFunction } from 'express';
import { getVotingInfo, getAllRegions } from '../services/votingInfoService';
import { createHttpError } from '../middlewares/errorHandler';

export function votingInfo(req: Request, res: Response, next: NextFunction): void {
  try {
    const query = (req.query.query as string | undefined) ?? '';
    const info = getVotingInfo(query);

    if (!info) {
      const regions = getAllRegions().join(', ');
      return next(
        createHttpError(
          `No voting information found for "${query}". Supported regions: ${regions}.`,
          404
        )
      );
    }

    res.json({ success: true, data: info });
  } catch (err) {
    next(err);
  }
}
