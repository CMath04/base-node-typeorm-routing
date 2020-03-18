import { Get, JsonController } from 'routing-controllers';
import { Inject } from 'typedi';
import { UserService } from "../services";

@JsonController('/auth')
export class AuthController {

  @Inject()
  private userService: UserService;

  constructor() {
  }

  @Get('/register')
  register() {
    return this.userService.add({
      id: undefined,
      email: 'chaussier.mathieu@gmail.com',
      password: 'password',
    })
  }
}
