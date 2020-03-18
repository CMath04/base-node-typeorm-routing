import { Service, } from 'typedi'
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../entities';

@Service()
export class UserService {

  @InjectRepository(User)
  private userRepo: Repository<User>;

  constructor() {
  }


  async getAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async getOne(id: number): Promise<User> {
    return await this.userRepo.findOne(id);
  }

  async add(newUser: User): Promise<User> {
    return await this.userRepo.save(newUser);
  }
}
