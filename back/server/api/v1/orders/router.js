const express = require('express');
const { paginator } = require('../../../middlewares');
const { me } = require('../auth/middlewares');
const {
  placeOrder,
  listOrders,
  confirmOrder,
  rejectOrder,
  deliverOrder,
} = require('./controller');

const router = express.Router();

router.route('/').get(me, paginator, listOrders).post(me, placeOrder);
router.route('/:orderId/confirm').patch(me, confirmOrder);
router.route('/:orderId/reject').patch(me, rejectOrder);
router.route('/:orderId/deliver').patch(me, deliverOrder);

module.exports = router;
