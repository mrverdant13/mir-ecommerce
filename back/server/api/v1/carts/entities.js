const mongoose = require('mongoose');

const cartItemFields = {
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
};

const cartItemSchema = new mongoose.Schema(cartItemFields, { _id: false });

module.exports = {
  cartItemSchema,
};
