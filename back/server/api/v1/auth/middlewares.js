const { verify } = require('jsonwebtoken');

const {
  jwt: { secret },
} = require('../../../../config');
const { UnauthorizedErrorResponse } = require('../../../responses');
const { User } = require('../users');

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
    const { id } = await verify(jwt, secret);
    const me = await User.findById(id);
    if (!me) return next(unauthorizedResponse);
    req.me = me;
    return next();
  } catch (err) {
    return next(err);
  }
};
