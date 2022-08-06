const { getPaginationParams } = require('../../../middlewares/paginator');
const { User } = require('./entity');

exports.listUsers = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationParams(req);
    const [users, usersCount] = await Promise.all([
      User.find().skip(offset).limit(limit),
      User.countDocuments(),
    ]);
    return res.status(200).json({ total: usersCount, users });
  } catch (err) {
    return next(err);
  }
};

exports.editProfile = async (req, res, next) => {
  try {
    const { me } = req;
    const { name, lastName } = req.body;
    me.name = name;
    me.lastName = lastName;
    const updatedUser = await me.save();
    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};
