import { Request, Response, NextFunction } from 'express';
import { getChatReply } from '../services/aiService';
import { createHttpError } from '../middlewares/errorHandler';

export async function chat(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { message } = req.body as { message: string };
    const { reply } = await getChatReply(message);

    res.status(200).json({ success: true, reply });
  } catch (error: unknown) {
    // Convert known error message to a 503 operational error
    if (
      error instanceof Error &&
      error.message.includes('temporarily unavailable')
    ) {
      return next(createHttpError(error.message, 503));
    }
    next(error);
  }
}
