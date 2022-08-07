const { verify } = require('jsonwebtoken');

const {
  jwt: { secret },
} = require('../../../../config');
const logger = require('../../../../logger');
const {
  UnauthorizedErrorResponse,
  InternalServerErrorResponse,
  ForbiddenErrorResponse,
} = require('../../../responses');
const { User } = require('../users/entity');

const bearerPrefix = 'Bearer ';

exports.me = async (req, _, next) => {
  try {
    const unauthorizedResponse = UnauthorizedErrorResponse();
    const { headers = {} } = req;
    const authHeader = headers.authorization;
    if (!authHeader) return next(unauthorizedResponse);
    if (!authHeader.startsWith(bearerPrefix)) return next(unauthorizedResponse);
    const jwt = authHeader.substring(bearerPrefix.length);
    if (!jwt) return next(unauthorizedResponse);
    const { id } = verify(jwt, secret);
    const me = await User.findById(id);
    if (!me) return next(unauthorizedResponse);
    req.me = me;
    return next();
  } catch (err) {
    if (err.message === 'jwt expired') {
      return next(UnauthorizedErrorResponse('Session expired'));
    }
    if (err.message === 'jwt malformed') {
      return next(UnauthorizedErrorResponse('Invalid access token'));
    }
    if (err.kind === 'ObjectId') {
      return next(UnauthorizedErrorResponse('Invalid access data'));
    }
    return next(err);
  }
};

exports.isAdmin = async (req, _, next) => {
  try {
    if (!req.me) {
      logger.error(
        `Implementation error: The 'me' middleware must be used before the 'isAdmin' middleware.`,
      );
      return next(InternalServerErrorResponse());
    }
    if (!req.me.isAdmin) return next(ForbiddenErrorResponse());
    return next();
  } catch (err) {
    return next(err);
  }
};
