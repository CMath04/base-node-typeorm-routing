import { hash as bcHash } from 'bcrypt';
import { SALTORROUNDS } from '../configurations';

export async function hash(str: string): Promise<string> {
  return bcHash(str, SALTORROUNDS);
}
