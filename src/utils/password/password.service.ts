import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';

@Injectable()
export class PasswordService {
  hashPassword = (password: string) => {
    if (typeof password !== 'string' || !password) return '';
    return hash(password);
  };

  decryptPassword = (userPassword: string, hashedPassword) => {
    return verify(hashedPassword, userPassword);
  };
}
