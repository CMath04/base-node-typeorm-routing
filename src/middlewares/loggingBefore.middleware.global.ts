import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { getLogger } from '../configurations';

@Middleware({ type: 'before' })
export class LoggingBeforeMiddlewareGlobal implements ExpressMiddlewareInterface {
  private logger = getLogger(__filename);

  use(request: Request, response: Response, next: NextFunction): any {
    this.logger.debug(`Incoming [${request.method}] request on route ${request.path}`);
    next();
  }
}
