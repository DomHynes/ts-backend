import * as log4js from 'log4js';
import { getLogger } from 'log4js';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const LoggingMiddleware = (prefix: string) => {
  const logger = getLogger(prefix);

  return log4js.connectLogger(logger, {
    level: 'auto',
    format: (req, _res, format): string =>
      format(
        `:remote-addr - ${
          req.id
        } - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent"`,
      ),
    statusRules: [
      { from: 200, to: 299, level: 'debug' },
      { codes: [303, 304], level: 'info' },
    ],
  });
};
