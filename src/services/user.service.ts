import { getConnection } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../entities/user.entity';

export class UserService {
  private userRepo: Repository<User> = getConnection().getRepository(User);

  async getAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async getOne(id: number): Promise<User> {
    return await this.userRepo.findOne(id);
  }
}
