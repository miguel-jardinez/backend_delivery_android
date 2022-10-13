import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { ProfileModule } from './profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from './utils/password/password.service';
import { isDev } from './utils/enviromentUtils';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        url: process.env.DB_URL || '',
        synchronize: isDev,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ProfileModule,
  ],
  controllers: [AuthController],
  providers: [PasswordService],
})
export class AppModule {}
