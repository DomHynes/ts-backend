import * as log4js from 'log4js';
import config from '../config';

log4js.configure({
  appenders: {
    default: {
      type: 'console',
    },
    slackAlerts: {
      type: '@log4js-node/slack',
      token: config.slack.token,
      // eslint-disable-next-line @typescript-eslint/camelcase
      channel_id: config.slack.alertsChannel,
      username: config.slack.username,
    },
  },
  categories: {
    default: { appenders: ['default'], level: 'debug' },
    slack: { appenders: ['slackAlerts'], level: 'error' },
  },
});
