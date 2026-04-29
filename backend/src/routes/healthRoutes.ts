import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /api/health
 * Cloud Run uses this to verify the container is alive.
 */
router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    service: 'election-navigator-api',
    timestamp: new Date().toISOString(),
  });
});

export default router;
