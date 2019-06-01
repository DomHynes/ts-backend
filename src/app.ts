import 'reflect-metadata';
import { RoutingControllersOptions, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { useContainer as typeormUseContainer } from 'typeorm';
import { connection } from './connection';
import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import './logging';
import { RequestIdMiddleware } from './middlewares/RequestId';

useContainer(Container);
typeormUseContainer(Container);

connection();

const serverOptions: RoutingControllersOptions = {
  controllers: [UserController, AuthController],
  middlewares: [RequestIdMiddleware],
  cors: true,
  routePrefix: '/v1',
};

export default serverOptions;
