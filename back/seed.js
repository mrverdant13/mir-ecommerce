const mongoose = require('mongoose');
const inquirer = require('inquirer');

const logger = require('./logger');
const database = require('./database');
const { usersKey, seedUsers } = require('./server/api/v1/users/seed');
const { productsKey, seedProducts } = require('./server/api/v1/products/seed');

database.connect();
mongoose.connection.on('open', () => seed());

const getSeedingOption = async () => {
  const answers = await inquirer.prompt({
    name: 'seedingOption',
    type: 'list',
    message: 'What do you want to seed?',
    choices: [
      { name: 'Users', value: usersKey },
      { name: 'Products', value: productsKey },
    ],
  });
  return answers.seedingOption;
};

const seed = async () => {
  const seedingOption = await getSeedingOption();
  switch (seedingOption) {
    case usersKey:
      seedUsers();
      break;
    case productsKey:
      seedProducts();
      break;
    default:
      logger.error(`Seeding option '${seedingOption}' not supported.`);
      break;
  }
};
