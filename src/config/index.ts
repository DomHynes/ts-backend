export default {
  jwtSecret: process.env.JWT_SECRET || 'supersecretssh',
  slack: {
    token: process.env.SLACK_TOKEN,
    alertsChannel: process.env.SLACK_ALERTS_CHANNEL,
    username: process.env.SLACK_ALERTS_USERNAME,
  },
};
