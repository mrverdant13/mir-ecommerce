const mongoose = require('mongoose');
const logger = require('./logger');
const { database: dbConnectionData } = require('./config');

mongoose.connection.on('open', () => logger.info('Connected to DB'));
mongoose.connection.on('close', () => logger.info('Disconnected from DB'));
mongoose.connection.on('error', (err) => logger.error(`DB error: ${err}`));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Disconnected from DB (on process SIGINT)');
    process.exit(0);
  });
});

exports.connect = () => {
  const {
    protocol = '',
    url = '',
    username = '',
    password = '',
  } = dbConnectionData;
  const connectionString = (() => {
    if (!username || !password) return `${protocol}://${url}`;
    return `${protocol}://${username}:${password}@${url}`;
  })();
  mongoose.connect(connectionString);
};

exports.disconnect = () => {
  mongoose.connection.close(() => {
    logger.info('Disconnected from DB (on demand)');
  });
};
