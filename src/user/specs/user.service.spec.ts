import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PasswordService } from '../../utils/password/password.service';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  emailUser1,
  oneUser,
  userArray,
} from '../../utils/mocks/auth/mockAccountUsers';
import { RegisterUserDto } from '../dto/registerUser.dto';

describe('UserService', () => {
  let service: UserService;
  let passwordService: PasswordService;
  let repo: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        PasswordService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneUser),
            create: jest.fn().mockResolvedValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    passwordService = module.get<PasswordService>(PasswordService);
    service = module.get<UserService>(UserService);
    repo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return and array of users', async () => {
      const users = await service.findAllUsers();
      expect(users).toEqual(userArray);
    });
  });

  describe('getOne', () => {
    it('should get one user', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(emailUser1)).resolves.toEqual(oneUser);
      expect(repoSpy).toBeCalledWith({ where: { email: emailUser1 } });
    });
  });

  describe('createUser', () => {
    it('should successfully insert a user', async () => {
      jest.spyOn(repo, 'create').mockReturnValue(oneUser);
      jest.spyOn(passwordService, 'hashPassword').mockResolvedValue('123');

      const user: RegisterUserDto = {
        email: 'test1@test.com',
        password: '12jb8f7v8gh980ion',
      };

      const data = await service.createUser(user);
      expect(data.message).toBe('User Created successfully');
      expect(data.response).toBe(oneUser);
    });
  });
});
