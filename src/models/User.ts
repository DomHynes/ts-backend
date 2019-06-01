import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import config from '../config';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  @Length(4, 20)
  @IsNotEmpty()
  public username!: string;

  @Column()
  @Length(4, 100)
  @Exclude({ toPlainOnly: true })
  public password!: string;

  @Column()
  public role!: string;

  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt?: Date;

  public hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(
    unencryptedPassword: string,
  ): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  public createJWT(): string {
    const { id, username, role } = this;
    return jwt.sign({ id, username, role }, config.jwtSecret, {
      expiresIn: '1h',
    });
  }
}

export default User;
