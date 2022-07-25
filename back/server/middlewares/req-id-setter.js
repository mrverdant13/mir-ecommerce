const { v4: uuid } = require('uuid');

const reqIdSetter = (req, _, next) => {
  req.id = uuid();
  next();
};

module.exports = reqIdSetter;
