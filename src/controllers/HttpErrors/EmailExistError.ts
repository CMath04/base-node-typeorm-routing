import { HttpError } from 'routing-controllers';

/**
 * Email address already in use.
 * return HTTP 409 code.
 */
export class EmailExistError extends HttpError {
  name: string;

  constructor(message?: string) {
    super(409, message ? message : 'The address mail already exist');
    this.name = 'EmailExistError';
  }
}
