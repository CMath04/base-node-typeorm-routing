import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { hash } from '../utils';

@Entity({ name: 'user' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  firstname: string;

  @Column()
  @IsNotEmpty()
  lastname: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(8)
  password: string;

  @Column({ nullable: true })
  token: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  async setPassword(newPassword: string) {
    this.password = await hash(newPassword);
  }

  @BeforeInsert()
  async encryptPassword() {
    this.password = await hash(this.password);
  }
}
