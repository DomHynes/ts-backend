import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  HttpCode,
} from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { getConnectionManager, Repository } from 'typeorm';
import { User } from '../models/User';
import { UserResponse, RegistrationRequest } from './responses';

@JsonController('/users')
export class UserController {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getConnectionManager()
      .get()
      .getRepository(User);
  }

  @Get('/')
  @ResponseSchema(UserResponse, {
    description: 'A list of available users',
    isArray: true,
  })
  async getAll() {
    return { users: await this.userRepository.find() };
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.userRepository.findOneOrFail(id);
  }

  @Post('/')
  @HttpCode(201)
  async post(@Body() user: RegistrationRequest) {
    user.hashPassword();
    await this.userRepository.insert({ ...user, role: 'user' });
    return this.userRepository.find({ username: user.username });
  }
}
