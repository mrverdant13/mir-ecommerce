const morgan = require('morgan');

const logger = require('../../logger');

morgan.token('id', (req) => req.id);
const reqLogger = morgan(
  ':remote-addr [:date[iso]] :id - ":method :url" - :status',
  { stream: { write: (message) => logger.info(message.trim()) } },
);

module.exports = reqLogger;
