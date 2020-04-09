import { hash as bcHash } from 'bcrypt';
import { SALT_OR_ROUNDS } from '../configurations';

export async function hash(str: string): Promise<string> {
  return bcHash(str, SALT_OR_ROUNDS);
}
