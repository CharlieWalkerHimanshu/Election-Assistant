import 'dotenv/config';
import { createApp } from './app';
import { logger } from './utils/logger';

const PORT = Number(process.env.PORT) || 8080;

const app = createApp();

const server = app.listen(PORT, () => {
  logger.info(
    `Election Navigator API running on port ${PORT} [${process.env.NODE_ENV ?? 'development'}]`
  );
});

// Graceful shutdown (required for Cloud Run SIGTERM handling)
function shutdown(signal: string): void {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });
  // Force exit if close takes too long
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
