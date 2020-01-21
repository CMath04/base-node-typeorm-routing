import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../configurations/logger.config';

@Middleware({ type: 'before' })
export class LoggingMiddlewareGlobal implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: NextFunction): any {
    logger.info(`Incoming [${request.method}] request on route ${request.path}`);
    next();
  }
}
