/* eslint-disable no-unused-expressions */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

// detect uncaught
process.on('uncaughtException', error => {
  errorLogger.error(error);

  process.exit(1);
});

// init server
let server: Server;

async function connectDatabase() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      logger.info(
        `University management auth service listening on port ${config.port}`,
      );
    });
  } catch (err) {
    errorLogger.error('Fail to connect Database');
  }
  // close server on unhandled error
  process.on('unhandledRejection', error => {
    // if server is running then close it first
    errorLogger.error(error);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

connectDatabase();

// sigterm received
process.on('SIGTERM', () => {
  logger.info('Sigterm is received');
  if (server) {
    server.close();
  }
});
