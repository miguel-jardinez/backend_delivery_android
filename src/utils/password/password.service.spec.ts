import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';

const passWordHashed =
  '$argon2id$v=19$m=4096,t=3,p=1$PKnR9KsGNwNUJTntHImDvA$xpt42cayym2A69wJOOk0KwTHOjGHjF5r03Q2iueAkic';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hashPassword', () => {
    it('should return hash password', async () => {
      const passwordHashed = await service.hashPassword('1234');
      expect(passwordHashed).toContain('$argon2id$');
      expect(passwordHashed).not.toEqual('1234');
    });

    it('should return empty string if password has 0 characters', async () => {
      const passwordHashed = await service.hashPassword('');
      expect(passwordHashed).toBe('');
    });
  });

  describe('decryptPassword', () => {
    it('should return true when password will correct', async () => {
      const response = await service.decryptPassword('1234', passWordHashed);
      expect(response).toBeTruthy();
    });

    it('should return false when password will not correct', async () => {
      const response = await service.decryptPassword('qwerty', passWordHashed);
      expect(response).toBeFalsy();
    });
  });
});
