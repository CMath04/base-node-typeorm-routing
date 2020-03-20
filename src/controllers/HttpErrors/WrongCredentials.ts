import { HttpError } from 'routing-controllers';

export class WrongCredentials extends HttpError {
  name: string;

  constructor(message?: string) {
    super(401, message ? message : 'The username or the password is incorrect');
    this.name = 'WrongCredentials';
  }
}
