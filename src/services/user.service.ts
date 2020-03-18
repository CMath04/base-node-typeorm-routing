import { getConnection } from 'typeorm';
import { Service } from 'typedi'
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../entities';

export class UserService {
  private userRepo: Repository<User>;

  constructor() {
    this.userRepo = getConnection().getRepository(User);
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
