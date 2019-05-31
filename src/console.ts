import 'reflect-metadata';
import * as repl from 'repl';
//@ts-ignore
import * as stubber from 'async-repl/stubber';
import { getConnectionManager } from 'typeorm';
import * as pjson from '../package.json';
import { connection } from './connection';

connection.then(db => {
  const replServer = repl.start({
    prompt: `${pjson.name}> `,
  });

  stubber(replServer);
  if (db.options.entities) {
    db.options.entities.forEach(entity => {
      if (typeof entity === 'function') {
        replServer.context[`${entity.name}Service`] = getConnectionManager()
          .get()
          .getRepository(entity);
        replServer.context[entity.name] = entity;
      }
    });
  }
});
