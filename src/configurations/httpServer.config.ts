import { createExpressServer } from 'routing-controllers';
import { Express, static as staticMw } from 'express';
import { logger } from './logger.config';
import { PORT } from './env.config';

export async function start() {
  try {
    logger.info('Starting http server');
    const app = createExpressServer({
      routePrefix: '/api',
      controllers: [__dirname + '/../controllers/*.controller.js'],
      middlewares: [__dirname + '/../middlewares/*.middleware.global.js'],
      development: false,
      defaultErrorHandler: true,
    }) as Express;
    app.use('/', staticMw(__dirname + '/../public'));
    await listen(app);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

function listen(app: any): Promise<void> {
  return new Promise(resolve => {
    app.listen(PORT, () => {
      logger.info(`Http server started. Listening on port ${PORT}`);
      resolve();
    });
  });
}
