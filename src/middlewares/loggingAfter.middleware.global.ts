import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { getLogger } from '../configurations';

@Middleware({ type: 'after' })
export class LoggingMiddlewareAfter implements ExpressMiddlewareInterface {
  private logger = getLogger(__filename);

  use(request: Request, response: Response, next: NextFunction): any {
    this.logger.debug(`Responding with status code [${response.statusCode}]`);
    next();
  }
}
