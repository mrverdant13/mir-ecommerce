const logger = require('../../logger');
const {
  BadRequestErrorResponse,
  InternalServerErrorResponse,
} = require('../responses');

const defaultLimit = 10;
const minLimit = 1;
const maxLimit = 100;

const defaultOffset = 0;
const minOffset = 0;

exports.paginator = (req, _, next) => {
  const {
    limit: limitStr = defaultLimit, // This comment prevents linting issues.
    offset: offsetStr = defaultOffset,
  } = req.query;
  const limit = parseInt(limitStr, 10);
  const offset = parseInt(offsetStr, 10);
  const limitIsValid = !Number.isNaN(limit) && limit >= minLimit;
  const offsetIsValid = !Number.isNaN(offset) && offset >= minOffset;
  if (!limitIsValid || !offsetIsValid) {
    const baseErrorMsg = 'Invalid pagination parameters';
    const invalidLimitMsg = limitIsValid
      ? ''
      : ' `limit` must be a positive integer.';
    const invalidOffsetMsg = offsetIsValid
      ? ''
      : ' `offset` must be an integer greater than or equal to 0.';
    return next(
      BadRequestErrorResponse(
        `${baseErrorMsg}${invalidLimitMsg}${invalidOffsetMsg}`,
      ),
    );
  }
  req.limit = Math.min(limit, maxLimit);
  req.offset = offset;
  return next();
};

exports.paginatorQueryParamsDocs = [
  {
    in: 'query',
    name: 'limit',
    description: 'Number of items to return',
    required: false,
    schema: {
      type: 'integer',
      minimum: minLimit,
      maximum: maxLimit,
      default: defaultLimit,
    },
  },
  {
    in: 'query',
    name: 'offset',
    description: 'Number of items to skip',
    required: false,
    schema: {
      type: 'integer',
      minimum: minOffset,
      default: defaultOffset,
    },
  },
];

function getPaginationParams(req) {
  const { limit, offset } = req;
  if (Number.isNaN(limit) || Number.isNaN(offset)) {
    logger.error(
      `
Implementation error:
The 'paginator' middleware must be used before retrieving pagination parameters.`,
    );
    throw InternalServerErrorResponse();
  }
  return { limit, offset };
}
exports.getPaginationParams = getPaginationParams;
