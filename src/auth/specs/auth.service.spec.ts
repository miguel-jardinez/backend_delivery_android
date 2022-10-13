import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { PasswordService } from '../../utils/password/password.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { HeaderApiKeyStrategy } from '../strategies/api-key.strategy';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { oneUser, userArray } from '../../utils/mocks/auth/mockAccountUsers';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../../user/dto/loginUser.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let passwordService: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        PasswordService,
        AuthService,
        LocalStrategy,
        JwtService,
        HeaderApiKeyStrategy,
        ConfigService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneUser),
            create: jest.fn().mockResolvedValue(oneUser),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    passwordService = module.get<PasswordService>(PasswordService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user if value login is correct', async () => {
      const loginUser: LoginUserDto = {
        email: 'mock1@mail.com',
        password: 'oiuy654efty789olkj',
      };

      jest.spyOn(userService, 'findOne').mockResolvedValue(oneUser);
      jest.spyOn(passwordService, 'decryptPassword').mockResolvedValue(true);

      await expect(
        authService.validateUser(loginUser.email, loginUser.password),
      ).resolves.toEqual({
        createdAt: new Date('2022-10-08T16:00:34.000Z'),
        email: 'test1@test.com',
        id: 1,
        updatedAt: new Date('2022-10-08T16:00:34.000Z'),
      });
    });

    it('should return null when user is not valid', async () => {
      const loginUser: LoginUserDto = {
        email: 'mock1@mail.com',
        password: 'oiuy654efty789olkj',
      };

      jest.spyOn(userService, 'findOne').mockResolvedValue(oneUser);
      jest.spyOn(passwordService, 'decryptPassword').mockResolvedValue(false);

      await expect(
        authService.validateUser(loginUser.email, loginUser.password),
      ).resolves.toEqual(null);
    });
  });
});
