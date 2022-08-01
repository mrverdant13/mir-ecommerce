const express = require('express');
const morgan = require('morgan');

const logger = require('../../logger');

morgan.token('id', (req) => req.id);

const format = ':remote-addr [:date[iso]] :id - ":method :url" - :status';

const reqLogger = express
  .Router()
  .use(
    morgan(format, {
      skip: (req, res) => res.statusCode >= 400,
      stream: {
        write: (msg) => {
          logger.info(msg.trim());
        },
      },
    }),
  )
  .use(
    morgan(format, {
      skip: (req, res) => res.statusCode < 400,
      stream: {
        write: (msg) => {
          logger.error(msg.trim());
        },
      },
    }),
  );

module.exports = reqLogger;
