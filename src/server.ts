import './utils/honeycomb';
import { Express } from 'express';
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import * as swaggerUi from 'swagger-ui-express';
import serverOptions from './app';
import { spec } from './spec';

const app: Express = createExpressServer(serverOptions);

app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(spec));
app.listen(2667);

console.log('Server is up and running at port 2667');
