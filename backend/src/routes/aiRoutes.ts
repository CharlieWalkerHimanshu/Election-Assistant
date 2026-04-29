import { Router } from 'express';
import { body } from 'express-validator';
import { chat } from '../controllers/aiController';
import { aiRateLimiter } from '../middlewares/rateLimiter';
import { validateRequest } from '../middlewares/validateRequest';

const router = Router();

const chatValidation = [
  body('message')
    .isString()
    .withMessage('message must be a string.')
    .trim()
    .notEmpty()
    .withMessage('message cannot be empty.')
    .isLength({ max: 500 })
    .withMessage('message must not exceed 500 characters.')
    // Sanitize: strip HTML tags to prevent XSS if output is ever rendered
    .escape(),
];

/**
 * POST /api/ai/chat
 * Body: { message: string }
 *
 * Rate-limited separately from global limiter (AI calls are expensive).
 * Input validated before reaching the controller.
 */
router.post('/chat', aiRateLimiter, chatValidation, validateRequest, chat);

export default router;
