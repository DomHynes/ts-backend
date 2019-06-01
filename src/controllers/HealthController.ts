import { Get, JsonController, UseBefore } from 'routing-controllers';
import { Connection } from 'typeorm';
import { InjectConnection } from 'typeorm-typedi-extensions';
import { LoggingMiddleware } from '../middlewares/Logging';
import { HealthResponse } from './responses';
import { ResponseSchema } from 'routing-controllers-openapi';

@JsonController('/health')
@UseBefore(LoggingMiddleware('HealthController'))
export class HealthController {
  private connection: Connection;
  public constructor(@InjectConnection() connection: Connection) {
    this.connection = connection;
  }
  @Get('/')
  @ResponseSchema(HealthResponse)
  public healthcheck(): HealthResponse {
    return {
      database: this.connection.isConnected,
    };
  }
}
