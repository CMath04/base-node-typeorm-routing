import { Body, CurrentUser, Get, JsonController, Post } from 'routing-controllers';
import { Inject } from 'typedi';
import bcrypt from 'bcrypt';
import { logger } from '../configurations';
import { UserService } from '../services';
import { User } from '../entities';
import { EmailExistError, WrongCredentials } from './HttpErrors';
import { LoginCredentials } from '../typing';

@JsonController('/auth')
export class AuthController {

  @Inject()
  private userService: UserService;

  @Post('/register')
  async register(@Body() newUser: User) {
    if (await this.userService.getOneByEmail(newUser.email)) {
      throw new EmailExistError();
    }
    const user = await this.userService.insert(newUser);
    logger.info(`User created with ID ${user.id}`);
    return this.userService.generateToken({
      id: user.id,
      email: user.email,
    });
  }

  @Post('/login')
  async login(@Body() credentials: LoginCredentials) {
    const user = await this.userService.getOneByEmail(credentials.email);
    if (!user || !await bcrypt.compare(credentials.password, user.password)) {
      throw new WrongCredentials();
    }
    return this.userService.generateToken({
      id: user.id,
      email: user.email,
    });
  }

  @Get('/me')
  me(@CurrentUser({ required: true }) user: User) {
    return user;
  }
}
