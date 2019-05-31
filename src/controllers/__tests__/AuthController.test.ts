import * as typeorm from 'typeorm';
import { AuthController } from '../AuthController';
import { User } from '../../models/User';

const mockUserModel = {
  createJWT: jest.fn(() => 'test token'),
  checkIfUnencryptedPasswordIsValid: jest.fn(password => password === password),
};

const mockRepository = ({
  findOneOrFail: () => Promise.resolve(mockUserModel),
} as unknown) as typeorm.Repository<User>;

describe('Auth Controller', () => {
  const authController = new AuthController(mockRepository);

  it('should return a jwt on successful auth', async () => {
    const response = await authController.login({
      username: 'username',
      password: 'password',
    });

    expect(response.token).toEqual('test token');
  });
});
