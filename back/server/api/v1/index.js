const express = require('express');

const router = express.Router();

// Functional endpoints
router.use('/auth', require('./auth/router'));
router.use('/health', require('./health').router);
router.use('/users', require('./users/router'));

// OpenAPI documentation
router.use('/docs', require('./docs').router);

module.exports = router;
