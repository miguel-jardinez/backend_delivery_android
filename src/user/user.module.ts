import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PasswordService } from '../utils/password/password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, PasswordService],
  exports: [UserService],
})
export class UserModule {}
