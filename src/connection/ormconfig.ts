import { User } from '../models/User';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'sqlite',
  synchronize: true,
  entities: [User],
  database: `${process.cwd()}/data/line.sqlite`,
  logging: ['error'],
};

export default config;
