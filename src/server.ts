import { NODE_ENV, DATA_DIR } from './configurations/env.config';
import { install as installSourceMapSupport } from 'source-map-support';
import { logger } from './configurations/logger.config';
import * as database from './configurations/database.config';
import * as httpServer from './configurations/httpServer.config';

installSourceMapSupport();

process.on('uncaughtException', err => {
  logger.error(err);
  process.exit(1);
});

process.on('exit', code => {
  logger.log(code === 0 ? 'info' : 'error', `Exiting with code ${code}`);
});

process.on('SIGINT', () => {
  logger.info('Manual shutdown');
  process.exit(0);
});

async function start() {
  logger.info(`Starting server - mode ${NODE_ENV}`);
  logger.info(`Data directory: ${DATA_DIR}`);
  await database.connect();
  await httpServer.start();
}

start()
  .then(() => {
    logger.info('Server ready');
  })
  .catch(err => {
    logger.error(err);
    process.exit(1);
  });
