import { IsString, IsDate, Length, IsNotEmpty } from 'class-validator';
import { User } from '../../models/User';

export class UserResponse {
  @IsString()
  username!: string;

  @IsString()
  role!: string;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt?: Date;
}

export class RegistrationRequest extends User {
  @Length(4, 20)
  @IsNotEmpty()
  public username!: string;

  @Length(4, 100)
  public password!: string;
}
