import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column({ type: 'text', unique: true })
  public email: string;

  @Exclude()
  @Column({ type: 'text' })
  public password: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
