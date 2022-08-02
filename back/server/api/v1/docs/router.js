const express = require('express');
const swaggerUi = require('swagger-ui-express');

const { port } = require('../../../../config');
const { authPaths, authSchemas, authTag } = require('../auth/docs');
const { cartsPaths, cartsTag, cartsSchemas } = require('../carts/docs');
const { healthPaths, healthSchemas, healthTag } = require('../health/docs');
const { ordersSchemas, ordersTag, ordersPaths } = require('../orders/docs');
const {
  productsSchemas,
  productsPaths,
  productsTag,
} = require('../products/docs');
const { usersSchemas, usersPaths, usersTag } = require('../users/docs');

const openApiDoc = {
  openapi: '3.0.0',
  info: {
    title: 'Ecommerce API',
    description: 'Ecommerce management API',
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://localhost:${port}/api/v1`,
    },
  ],
  tags: [authTag, cartsTag, healthTag, ordersTag, productsTag, usersTag],
  paths: {
    ...authPaths,
    ...cartsPaths,
    ...healthPaths,
    ...ordersPaths,
    ...productsPaths,
    ...usersPaths,
  },
  components: {
    schemas: {
      ...authSchemas,
      ...cartsSchemas,
      ...healthSchemas,
      ...ordersSchemas,
      ...productsSchemas,
      ...usersSchemas,
    },
    securitySchemes: {
      Bearer: {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
        bearerFormat: 'JWT',
      },
    },
  },
};

const router = express.Router();
router.use(swaggerUi.serve, swaggerUi.setup(openApiDoc));

module.exports = router;
