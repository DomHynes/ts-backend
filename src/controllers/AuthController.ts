import {
  BadRequestError,
  Body,
  JsonController,
  Post,
} from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../models/User';
import { LoginRequest, SuccessfulLoginResponse } from './responses';

@JsonController('/auth')
export class AuthController {
  private userRepository: Repository<User>;
  public constructor(@InjectRepository(User) repository: Repository<User>) {
    this.userRepository = repository;
  }

  @Post('/login')
  @ResponseSchema(SuccessfulLoginResponse)
  public async login(
    @Body() loginReq: LoginRequest,
  ): Promise<{ token: string }> {
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
