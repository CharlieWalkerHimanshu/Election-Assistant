import { Router } from 'express';
import { query } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';
import { votingInfo } from '../controllers/votingInfoController';

const router = Router();

router.get(
  '/',
  query('query')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('query is required')
    .isLength({ min: 2, max: 60 })
    .withMessage('query must be 2–60 characters')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('query must contain only letters, digits and spaces'),
  validateRequest,
  votingInfo
);

export default router;
