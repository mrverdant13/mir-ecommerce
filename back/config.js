require('dotenv').config();

const config = {
  port: process.env.PORT,
  defaultAdmin: {
    name: process.env.DEFAULT_ADMIN_NAME,
    lastName: process.env.DEFAULT_ADMIN_LAST_NAME,
    email: process.env.DEFAULT_ADMIN_EMAIL,
    password: process.env.DEFAULT_ADMIN_PASSWORD,
  },
  database: {
    protocol: process.env.DB_PROTOCOL,
    url: process.env.DB_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};

module.exports = config;
