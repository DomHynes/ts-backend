import { createConnection } from 'typeorm';
import config from './ormconfig';

export const connection = () => createConnection(config);
