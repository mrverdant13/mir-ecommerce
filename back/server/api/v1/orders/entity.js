const mongoose = require('mongoose');
const { orderProductFields } = require('./orderProduct.entity');

const orderFields = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  confirmedAt: {
    type: Date,
  },
  rejectedAt: {
    type: Date,
  },
  deliveredAt: {
    type: Date,
  },
  products: {
    type: [new mongoose.Schema(orderProductFields, { _id: false })],
    required: true,
  },
};

const orderSchema = new mongoose.Schema(orderFields, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = {
  Order,
};
