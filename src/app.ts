import { RoutingControllersOptions, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import './connection';
import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';

useContainer(Container);

const serverOptions: RoutingControllersOptions = {
  controllers: [UserController, AuthController],
  cors: true,
  routePrefix: '/v1',
};

export default serverOptions;
