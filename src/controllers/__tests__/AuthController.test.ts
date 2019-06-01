import * as typeorm from 'typeorm';
import { AuthController } from '../AuthController';
import { User } from '../../models/User';

const mockUserModel = {
  createJWT: jest.fn((): string => 'test token'),
  checkIfUnencryptedPasswordIsValid: jest.fn(
    (password): boolean => password === password,
  ),
};

const mockRepository = ({
  findOneOrFail: (): Promise<object> => Promise.resolve(mockUserModel),
} as unknown) as typeorm.Repository<User>;

describe('Auth Controller', (): void => {
  const authController = new AuthController(mockRepository);

  it('should return a jwt on successful auth', async (): Promise<void> => {
    const response = await authController.login({
      username: 'username',
      password: 'password',
    });

    expect(response.token).toEqual('test token');
  });
});
