import { install as installSourceMapSupport } from 'source-map-support';
import "reflect-metadata";
import { connect as connectDb, DATA_DIR, logger, NODE_ENV, start as startHttpServer } from './configurations';

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
  await connectDb();
  await startHttpServer();
}

start()
  .then(() => {
    logger.info('Server ready');
  })
  .catch(err => {
    logger.error(err);
    process.exit(1);
  });
