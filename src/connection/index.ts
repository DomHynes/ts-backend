import { createConnection, Connection } from 'typeorm';
import config from './ormconfig';

export const connection = (): Promise<Connection> => createConnection(config);
