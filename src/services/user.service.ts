import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from '../entities';
import { EXPIRES_TIME, JWT_SECRET } from '../configurations';
import { TokenDecoded, TokenPayload } from '../typing';

@Service()
export class UserService {

  @InjectRepository(User)
  private userRepo: Repository<User>;

  async insert(data: User): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async getOneByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ email });
  }

  async getOne(id: number): Promise<User> {
    return this.userRepo.findOne(id);
  }

  async generateToken(payload: TokenPayload): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn: EXPIRES_TIME }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }

  async verifyToken(token: string): Promise<TokenDecoded> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, ((err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as TokenDecoded);
        }
      }));
    });
  }
}
