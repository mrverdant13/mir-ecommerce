const express = require('express');
const { checkAvailability } = require('./controller');

const router = express.Router();

router.get('/', checkAvailability);

module.exports = router;
