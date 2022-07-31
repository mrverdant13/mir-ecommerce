const { compare, hash } = require('bcryptjs');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { defaultAdmin } = require('../../../../config');
const logger = require('../../../../logger');
const { cartItemSchema } = require('../carts/entities');

const passwordFieldName = 'password';

const hiddenFields = {
  [passwordFieldName]: {
    type: String,
    required: true,
  },
  cartItems: {
    type: [cartItemSchema],
    required: true,
    default: [],
  },
};

const explicitFields = {
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => isEmail(value),
      message: () => 'Invalid email',
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  ...hiddenFields,
};

const userSchema = new mongoose.Schema(explicitFields, { timestamps: true });

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const userJson = this.toObject();
  const hiddenFieldNames = Object.keys(hiddenFields);
  hiddenFieldNames.forEach((fieldName) => delete userJson[fieldName]);
  return userJson;
};

// eslint-disable-next-line func-names
userSchema.methods.verifyPassword = async function (value) {
  return compare(value, this.password);
};

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified(passwordFieldName)) {
    this.password = await hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

async function createDefaultAdminIfNotExists() {
  const maybeAdmin = await User.findOne({ isAdmin: true });
  if (maybeAdmin) return;
  logger.info('No admin found.');
  const newAdmin = new User({
    name: defaultAdmin.name,
    lastName: defaultAdmin.lastName,
    email: defaultAdmin.email,
    password: defaultAdmin.password,
    isAdmin: true,
  });
  await newAdmin.save();
  logger.info('Default admin created.');
}
createDefaultAdminIfNotExists();

module.exports = {
  User,
};
