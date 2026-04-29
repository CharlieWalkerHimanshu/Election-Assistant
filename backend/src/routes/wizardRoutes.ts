import { Router } from 'express';
import { votingSteps } from '../controllers/wizardController';

const router = Router();

/**
 * GET /api/voting-steps
 *
 * Returns the step-by-step voting guide (no params required).
 */
router.get('/', votingSteps);

export default router;
