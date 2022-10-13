import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { UserService } from '../../user/user.service';
import { PasswordService } from '../../utils/password/password.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import {
  oneUser,
  ResponseUser,
  userArray,
} from '../../utils/mocks/auth/mockAccountUsers';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

describe('AuthController', () => {
  let controller: AuthController;
  let jwtService: JwtService;
  let userService: UserService;
  let repo: Repository<UserEntity>;
  let passwordService: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UserService,
        PasswordService,
        AuthService,
        JwtService,
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

    passwordService = module.get<PasswordService>(PasswordService);
    controller = module.get<AuthController>(AuthController);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
    repo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return list of user', async () => {
      await expect(controller.getAllUsers()).resolves.toEqual(userArray);
    });
  });

  describe('login', () => {
    it('Should return token when user login correctly', async () => {
      jest.spyOn(jwtService, 'sign').mockReturnValue('mock_token_id');
      const req = {
        user: oneUser,
      };

      await expect(controller.login(req)).resolves.toEqual({
        access_token: 'mock_token_id',
      });
    });
  });

  describe('register', () => {
    it('should return a user when client create a new user', async () => {
      jest.spyOn(passwordService, 'hashPassword').mockResolvedValueOnce('123');
      jest.spyOn(userService, 'createUser').mockResolvedValue(ResponseUser);
      jest.spyOn(repo, 'save').mockResolvedValue(oneUser);

      expect(ResponseUser.message).toEqual('User Created Successfully');
      await expect(passwordService.hashPassword('123')).resolves.toEqual('123');
      await expect(controller.register(oneUser)).resolves.toEqual({
        code: 201,
        message: 'User Created Successfully',
        response: oneUser,
      });
    });
  });
});
