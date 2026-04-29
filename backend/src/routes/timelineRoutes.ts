import { Router } from 'express';
import { query } from 'express-validator';
import { timeline } from '../controllers/timelineController';
import { validateRequest } from '../middlewares/validateRequest';

const router = Router();

const timelineValidation = [
  query('country')
    .optional()
    .isString()
    .withMessage('country must be a string.')
    .trim()
    .isLength({ max: 50 })
    .withMessage('country must not exceed 50 characters.')
    .matches(/^[a-zA-Z\s-]+$/)
    .withMessage('country must contain only letters, spaces, or hyphens.'),
];

/**
 * GET /api/timeline
 * GET /api/timeline?country=india
 *
 * Returns the election phase timeline for the specified country (default: india).
 */
router.get('/', timelineValidation, validateRequest, timeline);

export default router;
