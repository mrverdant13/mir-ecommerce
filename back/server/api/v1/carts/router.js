const express = require('express');
const { me } = require('../auth/middlewares');
const { getMyCart, setProductInMyCart } = require('./controller');

const router = express.Router();

router.route('/mine').get(me, getMyCart).put(me, setProductInMyCart);

module.exports = router;
