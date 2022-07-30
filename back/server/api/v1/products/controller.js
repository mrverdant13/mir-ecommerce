const { getPaginationParams } = require('../../../middlewares/paginator');
const { Product } = require('./entity');

exports.listProducts = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationParams(req);
    const { group, category } = req.query;
    const filter = {};
    if (group != null) {
      filter.groups = group;
    }
    if (category != null) {
      filter.categories = category;
    }
    console.log(filter);
    const [products, productsCount] = await Promise.all([
      Product.find(filter).skip(offset).limit(limit),
      Product.countDocuments(filter),
    ]);
    return res.status(200).json({ total: productsCount, products });
  } catch (err) {
    return next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { body } = req;
    const product = new Product(body);
    const createdProduct = await product.save();
    return res.status(201).json(createdProduct);
  } catch (err) {
    return next(err);
  }
};

exports.listProductGroups = async (req, res, next) => {
  try {
    const groups = await Product.distinct('groups');
    return res.status(200).json(groups);
  } catch (err) {
    return next(err);
  }
};

exports.updateGroupForAllProducts = async (req, res, next) => {
  try {
    const { group: currentGroup } = req.params;
    const { newGroup } = req.body;
    console.log(currentGroup, newGroup);
    await Product.updateMany(
      { groups: currentGroup },
      { $set: { 'groups.$': newGroup } },
    );
    return res.status(200).json({ message: 'Group updated for all products.' });
  } catch (err) {
    return next(err);
  }
};

exports.listProductCategoriesByGroup = async (req, res, next) => {
  try {
    const { group } = req.params;
    const categories = await Product.distinct('categories', {
      groups: group,
    });
    return res.status(200).json(categories);
  } catch (err) {
    return next(err);
  }
};
