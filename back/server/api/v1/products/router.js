const express = require('express');
const { paginator } = require('../../../middlewares/paginator');
const { me, isAdmin } = require('../auth/middlewares');
const { createProduct, listProducts } = require('./controller');

const router = express.Router();

router.route('/').get(paginator, listProducts).post(me, isAdmin, createProduct);

module.exports = router;
