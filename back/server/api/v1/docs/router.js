const express = require('express');
const swaggerUi = require('swagger-ui-express');

const { port } = require('../../../../config');
const { healthPaths, healthSchemas, healthTag } = require('../health/docs');

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
  tags: [healthTag],
  paths: {
    ...healthPaths,
  },
  components: {
    schemas: {
      ...healthSchemas,
    },
  },
};

const router = express.Router();
router.use(swaggerUi.serve, swaggerUi.setup(openApiDoc));

module.exports = router;
