const express = require('express');
const { uploads } = require('../../../middlewares');
const { paginator } = require('../../../middlewares/paginator');
const { me, isAdmin } = require('../auth/middlewares');
const {
  createProduct,
  listProducts,
  listProductGroups,
  updateGroupForAllProducts,
  listProductCategoriesByGroup,
  addProductPhoto,
} = require('./controller');

const router = express.Router();

router.route('/').get(paginator, listProducts).post(me, isAdmin, createProduct);
router
  .route('/:productId/photo')
  .post(
    me,
    isAdmin,
    uploads('product-photos', ['image/jpeg', 'image/png']).single('photo'),
    addProductPhoto,
  );
router.route('/groups').get(listProductGroups);
router.route('/groups/:group').put(me, isAdmin, updateGroupForAllProducts);
router.route('/groups/:group/categories').get(listProductCategoriesByGroup);

module.exports = router;
