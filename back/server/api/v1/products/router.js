const express = require('express');
const { paginator } = require('../../../middlewares/paginator');
const { me, isAdmin } = require('../auth/middlewares');
const {
  createProduct,
  listProducts,
  listProductGroups,
  updateGroupForAllProducts,
  listProductCategoriesByGroup,
} = require('./controller');

const router = express.Router();

router.route('/').get(paginator, listProducts).post(me, isAdmin, createProduct);
router.route('/groups').get(listProductGroups);
router.route('/groups/:group').put(me, isAdmin, updateGroupForAllProducts);
router.route('/groups/:group/categories').get(listProductCategoriesByGroup);

module.exports = router;
