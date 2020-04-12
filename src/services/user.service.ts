import { Service } from 'typedi';
import { InjectConnection, InjectRepository } from 'typeorm-typedi-extensions';
import { Connection, Repository } from 'typeorm';
import { User } from '../entities';
import { getLogger } from '../configurations';

@Service()
export class UserService {

  @InjectRepository(User)
  private userRepo: Repository<User>;

  @InjectConnection()
  private connection: Connection;

  private logger = getLogger(__filename);

  async save(data: User): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async getOne(id: number): Promise<User> {
    return this.userRepo.findOne(id);
  }

  async getOneByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ email });
  }

  async updateToken(id: number, token: string): Promise<void> {
    await this.connection.createQueryBuilder()
      .update(User)
      .set({ token })
      .where('id = :id', { id })
      .execute();
  }

  async deleteToken(id: number): Promise<void> {
    await this.updateToken(id, null);
  }
}
