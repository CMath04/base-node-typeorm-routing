import { JsonController, Post, Body } from 'routing-controllers';
import { User } from '../entities/user.entity';
import { logger } from '../configurations/logger.config';

@JsonController()
export class AuthController {
  @Post('/login')
  login() {}

  @Post('/register')
  register(@Body({ validate: false }) user: User) {
    logger.info(user.id.toLocaleString());
    logger.info(user.email);
    logger.info(user.password);
  }
}
