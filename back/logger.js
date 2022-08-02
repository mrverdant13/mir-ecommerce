const { createLogger, format, transports } = require('winston');

// Transports
const dummyTransport = new transports.Console({
  level: 'emerg',
});

const errorFileTransport = new transports.File({
  format: format.json(),
  filename: 'logs/error.log',
  level: 'error',
});

const allConsoleTransport = new transports.Console({
  format: format.combine(format.colorize({ all: true }), format.simple()),
  level: 'debug',
});

// Always bulk error logs to file.
const logger = createLogger({ transports: [dummyTransport] });

// Log errors to file if in production.
if (process.env.NODE_ENV === 'production') {
  logger.add(errorFileTransport);
}

// Log to console if in development.
if (process.env.NODE_ENV === 'development') {
  logger.add(allConsoleTransport);
}

module.exports = logger;
