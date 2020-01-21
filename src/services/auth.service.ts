import { getConnection } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { UserService } from './user.service';
import { User } from '../entities/user.entity';

export class AuthService {
  private userService = new UserService();
  private userRepo: Repository<User> = getConnection().getRepository(User);
}
