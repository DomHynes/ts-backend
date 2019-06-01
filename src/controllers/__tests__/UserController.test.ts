import * as typeorm from 'typeorm';
import { User } from '../../models/User';
import { UserController } from '../UserController';

const mockRepository = ({
  find: (): Promise<User[]> => Promise.resolve([]),
} as unknown) as typeorm.Repository<User>;

describe('User Controller', (): void => {
  const userController = new UserController(mockRepository);

  it('should return an array of users', async (): Promise<void> => {
    const response = await userController.getAll();
    expect(response).toBeArray();
  });
});
