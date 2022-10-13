import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constans';
import { JwtStrategy } from './strategies/jwt.strategy';
import { HeaderApiKeyStrategy } from './strategies/api-key.strategy';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from '../utils/password/password.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [
    PasswordService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    HeaderApiKeyStrategy,
    ConfigService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
