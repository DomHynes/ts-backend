import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import * as RequestId from 'express-request-id';

@Middleware({ type: 'before' })
export class RequestIdMiddleware implements ExpressMiddlewareInterface {
  public use = RequestId();
}
