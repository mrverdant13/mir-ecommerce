const express = require('express');

const { paginator } = require('../../../middlewares/paginator');
const { me, isAdmin } = require('../auth/middlewares');
const { listUsers } = require('./controller');

const router = express.Router();

router.route('/').get(me, isAdmin, paginator, listUsers);

module.exports = router;
