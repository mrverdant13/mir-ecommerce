const { getPaginationParams } = require('../../../middlewares/paginator');
const {
  ConflictErrorResponse,
  NotFoundErrorResponse,
} = require('../../../responses');
const { User } = require('../users/entity');
const { Order } = require('./entity');

exports.listOrders = async (req, res, next) => {
  try {
    const { me } = req;
    const { limit, offset } = getPaginationParams(req);
    const filter = { userId: me._id };
    const [orders, ordersCount] = await Promise.all([
      Order.find(filter).skip(offset).limit(limit),
      Order.countDocuments(filter),
    ]);
    return res.status(200).json({ total: ordersCount, orders });
  } catch (err) {
    return next(err);
  }
};

exports.placeOrder = async (req, res, next) => {
  try {
    const { _id } = req.me;
    const me = await User.findOne({ _id }).populate('cartItems.product');
    const cartItems = me.cartItems;
    if (cartItems.length === 0) {
      const errorMsg = 'Empty user cart';
      return next(ConflictErrorResponse(errorMsg));
    }
    const order = new Order({
      userId: me._id,
      products: cartItems.map((item) => ({
        name: item.product.name,
        description: item.product.description,
        photos: item.product.photos,
        price: item.product.price,
        quantity: item.quantity,
      })),
    });
    const createdOrder = await order.save();
    me.cartItems = [];
    await me.save();
    return res.status(200).json(createdOrder);
  } catch (err) {
    return next(err);
  }
};

exports.confirmOrder = async (req, res, next) => {
  try {
    const { _id } = req.me;
    const { orderId: id } = req.params;
    const order = await Order.findById(id);
    if (order.userId.toString() !== _id.toString()) {
      const errorMsg = 'Order not found';
      return next(NotFoundErrorResponse(errorMsg));
    }
    if (order.deliveredAt) {
      const errorMsg = 'Order already delivered';
      return next(ConflictErrorResponse(errorMsg));
    }
    if (order.rejectedAt) {
      const errorMsg = 'Order already rejected';
      return next(ConflictErrorResponse(errorMsg));
    }
    if (order.confirmedAt) {
      const errorMsg = 'Order already confirmed';
      return next(ConflictErrorResponse(errorMsg));
    }
    order.confirmedAt = new Date();
    await order.save();
    return res.status(200).json(order);
  } catch (err) {
    return next(err);
  }
};

exports.rejectOrder = async (req, res, next) => {
  try {
    const { _id } = req.me;
    const { orderId: id } = req.params;
    const order = await Order.findById(id);
    if (order.userId.toString() !== _id.toString()) {
      const errorMsg = 'Order not found';
      return next(NotFoundErrorResponse(errorMsg));
    }
    if (order.deliveredAt) {
      const errorMsg = 'Order already delivered';
      return next(ConflictErrorResponse(errorMsg));
    }
    if (order.rejectedAt) {
      const errorMsg = 'Order already rejected';
      return next(ConflictErrorResponse(errorMsg));
    }
    if (order.confirmedAt) {
      const errorMsg = 'Order already confirmed';
      return next(ConflictErrorResponse(errorMsg));
    }
    order.rejectedAt = new Date();
    await order.save();
    return res.status(200).json(order);
  } catch (err) {
    return next(err);
  }
};

exports.deliverOrder = async (req, res, next) => {
  try {
    const { _id } = req.me;
    const { orderId: id } = req.params;
    const order = await Order.findById(id);
    if (order.userId.toString() !== _id.toString()) {
      const errorMsg = 'Order not found';
      return next(NotFoundErrorResponse(errorMsg));
    }
    if (order.deliveredAt) {
      const errorMsg = 'Order already delivered';
      return next(ConflictErrorResponse(errorMsg));
    }
    if (order.rejectedAt) {
      const errorMsg = 'Order already rejected';
      return next(ConflictErrorResponse(errorMsg));
    }
    if (!order.confirmedAt) {
      const errorMsg = 'Order not confirmed';
      return next(ConflictErrorResponse(errorMsg));
    }
    order.deliveredAt = new Date();
    await order.save();
    return res.status(200).json(order);
  } catch (err) {
    return next(err);
  }
};
