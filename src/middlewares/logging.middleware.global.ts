import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../configurations';

@Middleware({ type: 'before' })
export class LoggingMiddlewareGlobal implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: NextFunction): any {
    logger.info(`Incoming [${request.method}] request on route ${request.path}`);
    next();
  }
}
