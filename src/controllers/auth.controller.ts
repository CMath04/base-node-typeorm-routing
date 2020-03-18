import { Get, JsonController } from 'routing-controllers';
import { UserService } from "../services";

@JsonController('/auth')
export class AuthController {

  private userService: UserService;

  constructor() {
    this.userService = new UserService();
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
