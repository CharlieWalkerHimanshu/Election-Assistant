import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

import { globalRateLimiter } from './middlewares/rateLimiter';
import { errorHandler } from './middlewares/errorHandler';
import healthRoutes from './routes/healthRoutes';
import aiRoutes from './routes/aiRoutes';
import { logger } from './utils/logger';

export function createApp(): Application {
  const app = express();

  // ── Security headers ──────────────────────────────────
  app.use(helmet());

  // ── CORS ──────────────────────────────────────────────
  const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. server-to-server, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS: origin ${origin} not allowed`));
        }
      },
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // ── Body parsing ──────────────────────────────────────
  app.use(express.json({ limit: '10kb' })); // prevent large payload attacks

  // ── Global rate limiting ──────────────────────────────
  app.use(globalRateLimiter);

  // ── Request logging (dev) ─────────────────────────────
  if (process.env.NODE_ENV !== 'test') {
    app.use((req: Request, _res: Response, next: NextFunction) => {
      logger.debug(`${req.method} ${req.path}`);
      next();
    });
  }

  // ── Routes ────────────────────────────────────────────
  app.use('/api/health', healthRoutes);
  app.use('/api/ai', aiRoutes);
  app.use('/api/timeline', (_req, res) =>
    res.status(501).json({ success: false, message: 'Not yet implemented' })
  );
  app.use('/api/wizard', (_req, res) =>
    res.status(501).json({ success: false, message: 'Not yet implemented' })
  );

  // ── 404 handler ───────────────────────────────────────
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ success: false, message: 'Route not found.' });
  });

  // ── Global error handler ─────────────────────────────
  app.use(errorHandler);

  return app;
}
