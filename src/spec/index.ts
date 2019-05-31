import { getFromContainer, MetadataStorage } from 'class-validator'; // tslint:disable-line
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import 'reflect-metadata';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import serverOptions from '../app';

// Parse class-validator classes into JSON Schema:
const metadatas = (getFromContainer(MetadataStorage) as any)
  .validationMetadatas;
const schemas = validationMetadatasToSchemas(metadatas, {
  refPointerPrefix: '#/components/schemas/',
});

// Parse routing-controllers classes into OpenAPI spec:
const storage = getMetadataArgsStorage();

export const spec = routingControllersToSpec(storage, serverOptions, {
  components: {
    schemas,
  },
  info: {
    description: 'Generated with `routing-controllers-openapi`',
    title: 'A sample API',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:2667',
      description: 'local',
    },
  ],
});
