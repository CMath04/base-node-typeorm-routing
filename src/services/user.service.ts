import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { User } from '../entities';

@Service()
export class UserService {

  @InjectRepository(User)
  private userRepo: Repository<User>;

  async save(data: User): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async getOneByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ email });
  }

  async getOne(id: number): Promise<User> {
    return this.userRepo.findOne(id);
  }
}
