import { config } from 'dotenv';

config();

export default {
  jwtSecret: process.env.JWT_SECRET || 'supersecretssh',
  slack: {
    token: process.env.SLACK_TOKEN,
    alertsChannel: process.env.SLACK_ALERTS_CHANNEL,
    username: process.env.SLACK_ALERTS_USERNAME,
  },
  honeycomb: {
    writeKey: process.env.HONEYCOMB_WRITE_KEY,
    dataset: process.env.HONEYCOMB_DATASET,
  },
};
