const logger = require('../../logger');

const notFoundMiddleware = (_, __, next) => {
  next({ statusCode: 404, message: 'Not Found' });
};

const fallbackErrorMiddleware = (err, _, __, next) => {
  logger.info(`Fallback error middleware: ${err}`);
  const { statusCode = 500, message = 'Internal Server Error' } = err;
  next({ statusCode, message });
};

const errorHandlerMiddleware = (err, _, res, __) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({ message });
};

const errorHandlers = [
  notFoundMiddleware,
  fallbackErrorMiddleware,
  errorHandlerMiddleware,
];

module.exports = errorHandlers;
