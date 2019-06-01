import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { User } from '../../models/User';

export class UserResponse {
  @IsString()
  public id!: string;

  @IsString()
  public username!: string;

  @IsString()
  public role!: string;

  @IsDate()
  public createdAt!: Date;

  @IsDate()
  public updatedAt!: Date;
}

export class RegistrationRequest extends User {
  @Length(4, 20)
  @IsNotEmpty()
  public username!: string;

  @Length(4, 100)
  public password!: string;
}

export class LoginRequest {
  @IsString()
  public username!: string;
  @IsString()
  public password!: string;
}

export class SuccessfulLoginResponse {
  @IsString()
  public token!: string;
}

export class HealthResponse {
  @IsBoolean()
  public database!: boolean;
}
