import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { logger } from '../configurations';

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  /*
   When an error is thrown, it will be first catch by the routing-controller lib.
   If there is not http status code provided in the error, the library will by default add the
   code 500.
   This handler will only log error with code 500 or above as it mean that the error comes from
   the server and not the request.
   QueryFailedError are already logged from the custom typeorm logger
   */
  error(error: any, request: Request, response: Response, next: NextFunction): void {
    if (!(error instanceof QueryFailedError) && (!error.httpCode || error.httpCode >= 500)) {
      logger.error(error);
    }
    next();
  }
}
