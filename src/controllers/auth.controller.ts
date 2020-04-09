import { Body, CurrentUser, Get, JsonController, Post } from 'routing-controllers';
import { Inject } from 'typedi';
import { compare } from 'bcrypt';
import { getLogger } from '../configurations';
import { UserService } from '../services';
import { User } from '../entities';
import { EmailExistError, WrongCredentials } from './HttpErrors';
import { LoginCredentials } from '../typing';
import { SecurityService } from '../services/security.service';

@JsonController('/auth')
export class AuthController {

  @Inject()
  private userService: UserService;

  @Inject()
  private securityService: SecurityService;

  private logger = getLogger(__filename);

  @Post('/register')
  async register(@Body() newUser: User) {
    if (await this.userService.getOneByEmail(newUser.email)) {
      throw new EmailExistError();
    }

    const user = await this.userService.save(newUser);
    this.logger.info(`User created with ID ${user.id}`);
    return this.securityService.generateToken({
      id: user.id,
      email: user.email,
    });
  }

  @Post('/login')
  async login(@Body() credentials: LoginCredentials) {
    const user = await this.userService.getOneByEmail(credentials.email);
    if (!user || !await compare(credentials.password, user.password)) {
      throw new WrongCredentials();
    }
    return this.securityService.generateToken({
      id: user.id,
      email: user.email,
    });
  }

  @Get('/me')
  me(@CurrentUser({ required: true }) user: User) {
    return user;
  }
}
