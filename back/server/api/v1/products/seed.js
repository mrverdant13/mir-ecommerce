const inquirer = require('inquirer');
const {
  faker: {
    commerce: { price, productName, productDescription },
    helpers: { arrayElements, uniqueArray },
    image: { image },
    random: { numeric },
  },
} = require('@faker-js/faker');

const { Product } = require('./entity');

const productsKey = 'products';

const seedProducts = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        name: 'shouldClearExisting',
        type: 'confirm',
        message: 'Do you want to clear existing products?',
      },
      {
        name: 'productsCount',
        type: 'number',
        message: 'How many products do you want to seed?',
        validate: (value) =>
          /^\d+$/.test(value) ? true : 'Please enter a valid number',
      },
    ]);
    const { shouldClearExisting, productsCount } = answers;
    if (shouldClearExisting) {
      console.info('Clearing existing products...');
      await Product.deleteMany({});
    }
    console.info(`Seeding ${productsCount} products...`);
    for (let i = 0; i < productsCount; i++) {
      const product = new Product({
        name: productName(),
        description: productDescription(),
        price: price(),
        groups: arrayElements(['Men', 'Women']),
        categories: arrayElements([
          'Category 1',
          'Category 2',
          'Category 3',
          'Category 4',
        ]),
        photos: uniqueArray(() => image(640, 480, true), Number(numeric())).map(
          (imgUrl) => {
            const url = new URL(imgUrl);
            return `${url.pathname}${url.search}`;
          },
        ),
      });
      await product.save();
    }
    console.info('Done');
    process.exit(0);
  } catch (e) {
    console.error(`Error seeding products.`);
    console.error(e);
    process.exit(1);
  }
};

module.exports = {
  productsKey,
  seedProducts,
};
