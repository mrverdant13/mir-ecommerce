const fs = require('fs');
const inquirer = require('inquirer');
const {
  faker: { internet, name },
} = require('@faker-js/faker');

const { User } = require('./entity');

const usersKey = 'users';

const seedUsers = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        name: 'shouldClearExisting',
        type: 'confirm',
        message: 'Do you want to clear existing users?',
      },

      {
        name: 'usersCount',
        type: 'number',
        message: 'How many users do you want to seed?',
        validate: (value) =>
          /^\d+$/.test(value) ? true : 'Please enter a valid number',
      },
    ]);
    const { shouldClearExisting, usersCount } = answers;
    if (shouldClearExisting) {
      console.info('Clearing existing users...');
      await User.deleteMany({ isAdmin: false });
    }
    console.info(`Seeding ${usersCount} users...`);
    const users = [];
    for (let i = 0; i < usersCount; i++) {
      const userData = {
        name: name.firstName(),
        lastName: name.lastName(),
        email: internet.email(),
        password: internet.password(),
      };
      const user = new User(userData);
      await user.save();
      users.push({ ...user.toJSON(), password: userData.password });
    }
    const usersJsonString = JSON.stringify(users, null, 2);
    const file = './logs/users.json';
    fs.writeFileSync(file, usersJsonString);
    console.info('Done');
    console.info(`Check the ${file} file to review the new users data.`);
    process.exit(0);
  } catch (e) {
    console.error(`Error seeding users.`);
    console.error(e);
    process.exit(1);
  }
};

module.exports = {
  usersKey,
  seedUsers,
};
