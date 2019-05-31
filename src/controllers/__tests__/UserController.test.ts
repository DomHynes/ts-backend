import * as typeorm from 'typeorm';
import { UserController } from '../UserController';
import { User } from '../../models/User';

const mockRepository = ({
  find: () => Promise.resolve([User]),
} as unknown) as typeorm.Repository<User>;

describe('User Controller', () => {
  const userController = new UserController(mockRepository);

  it('should return an array of users', async () => {
    const response = await userController.getAll();
    expect(response).toContainKey('users');
    expect(response.users).toBeArray();
  });
});
