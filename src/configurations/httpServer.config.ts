import { Action, createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { Express, static as staticMw } from 'express';
import { getLogger } from './logger.config';
import { PORT } from './env.config';
import { SecurityService, UserService } from '../services';
import { User } from '../entities';

const logger = getLogger(__filename);

export async function start() {
  try {
    logger.info('Starting http server');
    useContainer(Container);
    const app = createExpressServer({
      routePrefix: '/api',
      controllers: [__dirname + '/../controllers/*.controller.js'],
      middlewares: [__dirname + '/../middlewares/*.middleware.global.js'],
      development: false,
      defaultErrorHandler: true,
      validation: true,
      authorizationChecker,
      currentUserChecker
    }) as Express;

    app.use('/', staticMw(__dirname + '/../public'));
    await listen(app);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

async function authorizationChecker(action: Action, roles: string[]): Promise<boolean> {
  const token = action.request.headers['authorization']?.split(' ')[1];
  const securityService = Container.get(SecurityService);
  try {
    await securityService.verifyToken(token);
    return true;
  } catch (e) {
    return false;
  }
}

async function currentUserChecker(action: Action): Promise<User> {
  const token = action.request.headers['authorization']?.split(' ')[1];
  const userService = Container.get(UserService);
  const securityService = Container.get(SecurityService);
  try {
    const decoded = await securityService.verifyToken(token);
    return await userService.getOne(decoded.id);
  } catch (e) {
    return undefined;
  }
}

async function listen(app: any): Promise<void> {
  return new Promise(resolve => {
    app.listen(PORT, () => {
      logger.info(`Http server started. Listening on port ${PORT}`);
      resolve();
    });
  });
}
