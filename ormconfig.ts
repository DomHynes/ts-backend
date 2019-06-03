import { ConnectionOptions } from 'typeorm';
import { User } from './src/models/User';

const config: ConnectionOptions = {
  type: 'mariadb',
  host: 'localhost',
  database: 'test',
  username: 'test',
  password: 'test',
  port: 3306,
  synchronize: false,
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  logging: ['error'],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/models',
  },
};

export = config;
