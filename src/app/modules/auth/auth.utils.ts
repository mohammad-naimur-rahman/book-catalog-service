import bcrypt from 'bcrypt';
import config from '../../../config';

export async function hashPasswordHook(password: string): Promise<string> {
  const saltRounds = Number(config.bycrypt_salt_rounds); // You need to define your salt rounds from your configuration
  return await bcrypt.hash(password, saltRounds);
}
