const { getPaginationParams } = require('../../../middlewares/paginator');
const { Product } = require('./entity');

exports.listProducts = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationParams(req);
    const [products, productsCount] = await Promise.all([
      Product.find().skip(offset).limit(limit),
      Product.countDocuments(),
    ]);
    return res.status(200).json({ total: productsCount, products });
  } catch (err) {
    return next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { body } = req;
    const product = new Product(body);
    const createdProduct = await product.save();
    return res.status(201).json(createdProduct);
  } catch (err) {
    return next(err);
  }
};
