import { UserEntity } from '../../../user/entities/user.entity';
import { ResponseData } from '../../reponses/ResponseData';
import { HttpStatus } from '@nestjs/common';

export const date = new Date('Sat Oct 08 2022 11:00:34 GMT-0500');
export const emailUser1 = 'test1@test.com';
export const emailUser2 = 'test2@test.com';
export const emailUser3 = 'test3@test.com';

export const userArray = [
  new UserEntity({
    id: 1,
    email: emailUser1,
    password: '1234',
    updatedAt: date,
    createdAt: date,
  }),
  new UserEntity({
    id: 2,
    email: emailUser2,
    password: '1234',
    updatedAt: date,
    createdAt: date,
  }),
  new UserEntity({
    id: 3,
    email: emailUser3,
    password: '1234',
    updatedAt: date,
    createdAt: date,
  }),
];

export const oneUser = new UserEntity({
  id: 1,
  email: emailUser1,
  password: '1234',
  updatedAt: date,
  createdAt: date,
});

export const ResponseUser = new ResponseData(
  oneUser,
  HttpStatus.CREATED,
  'User Created Successfully',
);
