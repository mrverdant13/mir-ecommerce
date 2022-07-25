const logger = require('../../../../logger');
const { InternalServerErrorResponse } = require('../../../responses');
const { User } = require('./entity');

exports.listUsers = async (req, res, next) => {
  try {
    const { limit, offset } = req;
    if (Number.isNaN(limit) || Number.isNaN(offset)) {
      logger.error(
        `
Implementation error:
The 'paginator' middleware must be used before the 'listUsers' handler.
`,
      );
      return next(InternalServerErrorResponse());
    }
    const [users, usersCount] = await Promise.all([
      User.find().skip(offset).limit(limit),
      User.countDocuments(),
    ]);
    return res.status(200).json({ total: usersCount, users });
  } catch (err) {
    return next(err);
  }
};
