import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @Length(8, 30)
  public password: string;
}
