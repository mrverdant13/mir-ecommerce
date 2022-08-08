const {
  NotFoundErrorResponse,
  BadRequestErrorResponse,
} = require('../../../responses');
const { Product } = require('../products/entity');
const { User } = require('../users/entity');

exports.getMyCart = async (req, res, next) => {
  try {
    const { _id } = req.me;
    const me = await User.findOne({ _id }).populate('cartItems.product');
    const items = me.cartItems.sort((a, b) =>
      a.product.name.localeCompare(b.product.name),
    );
    return res.status(200).json(items);
  } catch (err) {
    return next(err);
  }
};

exports.setProductInMyCart = async (req, res, next) => {
  try {
    const { me } = req;
    const { productId, quantity } = req.body;
    if (quantity < 0) {
      const errorMsg = 'Quantity must be positive or zero.';
      return next(BadRequestErrorResponse(errorMsg));
    }
    const product = await Product.exists({ _id: productId });
    if (!product) return next(NotFoundErrorResponse('Product not found.'));
    const resultingCartItems = me.cartItems.filter(
      (item) => item.product.toString() !== productId,
    );
    if (quantity > 0) resultingCartItems.push({ product: productId, quantity });
    me.cartItems = resultingCartItems;
    await me.save();
    return res.status(200).json({ message: 'Cart item set.' });
  } catch (err) {
    return next(err);
  }
};
