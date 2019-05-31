import { IsString } from 'class-validator';
import {
  BadRequestError,
  Body,
  JsonController,
  Post,
} from 'routing-controllers';
import { getConnectionManager, Repository } from 'typeorm';
import { User } from '../models/User';
import { ResponseSchema } from 'routing-controllers-openapi';

class LoginRequest {
  @IsString()
  username!: string;
  @IsString()
  password!: string;
}

class SuccessfulLoginResponse {
  token!: string;
}

@JsonController('/auth')
export class AuthController {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getConnectionManager()
      .get()
      .getRepository(User);
  }

  @Post('/login')
  // @ResponseSchema(SuccessfulLoginResponse)
  async login(@Body() loginReq: LoginRequest) {
    const user = await this.userRepository.findOneOrFail({
      username: loginReq.username,
    });

    if (!user.checkIfUnencryptedPasswordIsValid(loginReq.password)) {
      throw new BadRequestError('password incorrect');
    }

    return {
      token: user.createJWT(),
    };
  }
}
