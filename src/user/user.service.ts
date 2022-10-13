import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ResponseData } from '../utils/reponses/ResponseData';
import { PasswordService } from '../utils/password/password.service';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/registerUser.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private passwordService: PasswordService,
  ) {}

  public findAllUsers() {
    this.logger.log('Return all user');
    return this.userRepository.find();
  }

  public findOne(email: string) {
    this.logger.log(`Finding user by email ${email}`);
    return this.userRepository.findOneOrFail({ where: { email } });
  }

  public async createUser(userDto: RegisterUserDto): Promise<ResponseData> {
    const user = this.userRepository.create(userDto);
    user.password = await this.passwordService.hashPassword(user.password);
    await this.userRepository.save(user);
    this.logger.log(`Trying to create user: {id: ${user.id}}`);
    return new ResponseData(
      user,
      HttpStatus.CREATED,
      'User Created successfully',
    );
  }
}
