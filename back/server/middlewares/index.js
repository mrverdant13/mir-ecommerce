const reqIdSetter = require('./req-id-setter');
const { paginator } = require('./paginator');
const reqLogger = require('./logger');
const errorHandlers = require('./error');

module.exports = {
  reqIdSetter,
  reqLogger,
  paginator,
  errorHandlers,
};
