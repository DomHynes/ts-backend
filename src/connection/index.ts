import { createConnection, Connection } from 'typeorm';
import * as config from '../../ormconfig';

export const connection = (): Promise<Connection> => createConnection(config);
