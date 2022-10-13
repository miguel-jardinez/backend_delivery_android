import { UserEntity } from './user.entity';

describe('User Class', () => {
  it('should make a user with no fields', () => {
    const data: Partial<UserEntity> = {};
    const user = new UserEntity(data);
    expect(user.id).toBe(undefined);
    expect(user.password).toBe(undefined);
    expect(user.createdAt).toBe(undefined);
    expect(user.email).toBe(undefined);
    expect(user.updatedAt).toBe(undefined);
  });

  it('should make a user with all fields', () => {
    const data: Partial<UserEntity> = {
      email: 'test@test.com',
      password: '1234',
      id: 1,
      updatedAt: new Date('Sat Oct 08 2022 11:00:34 GMT-0500'),
      createdAt: new Date('Sat Oct 08 2022 11:00:34 GMT-0500'),
    };

    const user = new UserEntity(data);
    expect(user.id).toBe(1);
    expect(user.password).toBe('1234');
    expect(user.createdAt.getDay()).toBe(6);
    expect(user.email).toBe('test@test.com');
    expect(user.updatedAt.getDay()).toBe(6);
  });
});
