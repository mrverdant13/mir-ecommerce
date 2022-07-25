const { createLogger, format, transports } = require('winston');

// Transports
const errorFileTransport = new transports.File({
  format: format.json(),
  filename: 'logs/error.log',
  level: 'error',
});
const combinedConsoleTransport = new transports.Console({
  format: format.simple(),
});

// Always bulk error logs to file.
const logger = createLogger({
  transports: [errorFileTransport],
});

// Log to console if not in production.
if (process.env.NODE_ENV !== 'production') {
  logger.add(combinedConsoleTransport);
}

module.exports = logger;
