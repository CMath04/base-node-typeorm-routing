import { Body, CurrentUser, Delete, Get, JsonController, Post } from 'routing-controllers';
import { Inject } from 'typedi';
import { compare } from 'bcrypt';
import { getLogger } from '../configurations';
import { SecurityService, UserService } from '../services';
import { User } from '../entities';
import { EmailExistError, WrongCredentials } from './HttpErrors';
import { LoginCredentials } from '../typing';

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
    const token = await this.securityService.generateToken({
      id: user.id,
      email: user.email,
    });
    await this.userService.updateToken(user.id, token);
    this.logger.info(`User created with ID ${user.id}`);
    return { accessToken: token };
  }

  @Post('/login')
  async login(@Body() credentials: LoginCredentials) {
    const user = await this.userService.getOneByEmail(credentials.email);
    if (!user || !await compare(credentials.password, user.password)) {
      throw new WrongCredentials();
    }
    if (user.token) {
      return { accessToken: user.token };
    } else {
      const token = await this.securityService.generateToken({
        id: user.id,
        email: user.email,
      });
      await this.userService.updateToken(user.id, token);
      return { accessToken: token };
    }
  }

  @Delete('/logout')
  async logout(@CurrentUser({ required: true }) user: User) {
    await this.userService.deleteToken(user.id);
    return { message: 'logged out' };
  }

  @Get('/me')
  me(@CurrentUser({ required: true }) user: User) {
    return user;
  }
}
