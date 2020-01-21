import { JsonController, Param, Get, NotFoundError } from 'routing-controllers';
import { UserService } from '../services/user.service';

@JsonController('/users')
export class UserController {
  private userService = new UserService();

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    const user = await this.userService.getOne(id);
    if (!user) throw new NotFoundError(`User with ID ${id} was not found`);
    return user;
  }
}
