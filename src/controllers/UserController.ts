import {
  Body,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
  UseBefore,
} from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { LoggingMiddleware } from '../middlewares/Logging';
import { User } from '../models/User';
import { RegistrationRequest, UserResponse } from './responses';

@JsonController('/users')
@UseBefore(LoggingMiddleware('UsersController'))
export class UserController {
  private repository: Repository<User>;
  public constructor(@InjectRepository(User) repository: Repository<User>) {
    this.repository = repository;
  }

  @ResponseSchema(UserResponse, {
    description: 'A list of available users',
    isArray: true,
  })
  @Get('/')
  @HttpCode(200)
  public async getAll(): Promise<User[]> {
    return this.repository.find();
  }

  @Get('/:id')
  public getOne(@Param('id') id: string): Promise<User> {
    return this.repository.findOneOrFail(id);
  }

  @Post('/')
  @HttpCode(201)
  @ResponseSchema(UserResponse, {
    description: 'Create New User',
  })
  public async post(@Body() user: RegistrationRequest): Promise<User> {
    user.hashPassword();
    await this.repository.insert({ ...user, role: 'user' });

    return this.repository.findOneOrFail({ username: user.username });
  }
}
