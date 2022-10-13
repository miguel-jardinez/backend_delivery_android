import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../utils/password/password.service';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async validateUser(email: string, userPassword: string) {
    const user = await this.userService.findOne(email);
    const isValidPassword = await this.passwordService.decryptPassword(
      userPassword,
      user.password,
    );

    if (user && isValidPassword) {
      const result = user;
      delete result.password;

      this.logger.log(`User Valid correctly ${result.id}`);
      return result;
    }

    this.logger.error('Error user not found');
    return null;
  }

  async login(user: UserEntity) {
    const payload = { id: user.id };

    this.logger.log(`User id to firm token ${payload.id}`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
