import {
  Body,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
} from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { getRepository, Repository } from 'typeorm';
import { User } from '../models/User';
import { RegistrationRequest, UserResponse } from './responses';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';

@JsonController('/users')
export class UserController {
  private repository: Repository<User>;
  constructor(@InjectRepository(User) repository: Repository<User>) {
    this.repository = repository;
  }

  @Get('/')
  @ResponseSchema(UserResponse, {
    description: 'A list of available users',
    isArray: true,
  })
  async getAll() {
    return { users: await this.repository.find() };
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.repository.findOneOrFail(id);
  }

  @Post('/')
  @HttpCode(201)
  async post(@Body() user: RegistrationRequest) {
    user.hashPassword();
    await this.repository.insert({ ...user, role: 'user' });
    return this.repository.find({ username: user.username });
  }
}
