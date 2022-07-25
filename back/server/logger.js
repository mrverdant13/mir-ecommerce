const logger = require('../logger');

function logErrorOnRequest(req, statusCode, message, level = 'error') {
  const date = new Date();
  const metadata = `${req.ip} [${date.toISOString()}] ${req.id}`;
  const logMsg = `${metadata} - "${req.method} ${req.url}" - ${statusCode} - ${message}`;
  logger[level](logMsg);
}

module.exports = { logErrorOnRequest };
