const mongoose = require('mongoose');

const fields = {
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  groups: {
    type: [String],
    required: true,
    minlength: 1,
  },
  categories: {
    type: [String],
    required: true,
    minlength: 1,
  },
  photos: {
    type: [String],
    required: true,
    default: [],
  },
};

const productSchema = new mongoose.Schema(fields, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = {
  Product,
};
