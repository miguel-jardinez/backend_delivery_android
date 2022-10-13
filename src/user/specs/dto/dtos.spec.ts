import { LoginUserDto } from '../../dto/loginUser.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RegisterUserDto } from '../../dto/registerUser.dto';

describe('Dto testing files', () => {
  describe('login user dto', () => {
    it('should return correct dto if data is correct', async () => {
      const loginUser: LoginUserDto = {
        email: 'mail@mail.com',
        password: '12345678',
      };
      const dto = plainToInstance(LoginUserDto, loginUser);
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should return password and email error dto if data is incorrect', async () => {
      const loginUser: LoginUserDto = {
        email: 'mail.com',
        password: '12348',
      };
      const dto = plainToInstance(LoginUserDto, loginUser);
      const errors = await validate(dto);
      expect(errors.length).toBe(2);
      expect(errors[0].constraints.isEmail).toBe('email must be an email');
      expect(errors[1].constraints.isLength).toBe(
        'password must be longer than or equal to 8 characters',
      );
    });
  });

  describe('register user dto', () => {
    it('should return correct dto if data is correct', async () => {
      const registerUser: RegisterUserDto = {
        email: 'mail@mail.com',
        password: '12345678',
      };
      const dto = plainToInstance(RegisterUserDto, registerUser);
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should return password and email error dto if data is incorrect', async () => {
      const registerUser: RegisterUserDto = {
        email: 'mail.com',
        password: '12348',
      };
      const dto = plainToInstance(RegisterUserDto, registerUser);
      const errors = await validate(dto);
      expect(errors.length).toBe(2);
      expect(errors[0].constraints.isEmail).toBe('email must be an email');
      expect(errors[1].constraints.isLength).toBe(
        'password must be longer than or equal to 8 characters',
      );
    });
  });
});
