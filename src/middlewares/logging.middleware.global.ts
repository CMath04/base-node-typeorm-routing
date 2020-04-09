import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { getLogger } from '../configurations';

@Middleware({ type: 'before' })
export class LoggingMiddlewareGlobal implements ExpressMiddlewareInterface {
  private logger = getLogger(__filename);

  use(request: Request, response: Response, next: NextFunction): any {
    this.logger.info(`Incoming [${request.method}] request on route ${request.path}`);
    next();
  }
}
