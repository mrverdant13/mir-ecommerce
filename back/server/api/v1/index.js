const express = require('express');

const router = express.Router();

// Functional endpoints
router.use('/auth', require('./auth/router'));
router.use('/carts', require('./carts/router'));
router.use('/health', require('./health').router);
router.use('/users', require('./users/router'));
router.use('/orders', require('./orders/router'));
router.use('/products', require('./products/router'));

// OpenAPI documentation
router.use('/docs', require('./docs').router);

module.exports = router;
