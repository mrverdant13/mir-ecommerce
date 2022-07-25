const morgan = require('morgan');
const { v4: uuid } = require('uuid');

const logger = require('../logger');

const { logErrorOnRequest } = require('./logger');

const reqIdSetter = (req, _, next) => {
  req.id = uuid();
  next();
};

morgan.token('id', (req) => req.id);
const reqLogger = morgan(
  ':remote-addr [:date[iso]] :id - ":method :url" - :status',
  { stream: { write: (message) => logger.info(message.trim()) } },
);

const notFoundMiddleware = (_, __, next) => {
  next({ statusCode: 404, message: 'Not Found' });
};

const fallbackErrorMiddleware = (err, _, __, next) => {
  logger.info(`Fallback error middleware: ${err}`);
  const { statusCode = 500, message = 'Internal Server Error' } = err;
  next({ statusCode, message });
};

const errorLoggerMiddleware = (err, req, __, next) => {
  const { statusCode, message } = err;
  logErrorOnRequest(req, statusCode, message);
  next(err);
};

// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, _, res, __) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({ message });
};

const errorHandlers = [
  notFoundMiddleware,
  fallbackErrorMiddleware,
  errorLoggerMiddleware,
  errorHandlerMiddleware,
];

module.exports = { reqIdSetter, reqLogger, errorHandlers };
