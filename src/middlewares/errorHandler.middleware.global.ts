import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../configurations/logger.config';

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  /*
   When an error is thrown, it will be first catch by the routing-controller lib.
   If there is not http status code provided in the error, the library will by default add the
   code 500.
   This handler will only log error with code 500 or above as it mean that the error comes from
   the server and not the request.
   */
  error(error: any, request: Request, response: Response, next: NextFunction): void {
    if (!error.httpCode || error.httpCode >= 500) {
      logger.error(error);
    }
    next();
  }
}
