const {
  refOkResBodyDoc,
  fallbackInternalServerErrorResBodyDoc,
} = require('../docs/res-bodies');

exports.healthTag = {
  name: 'health',
  description: 'Server health utilities.',
};

exports.healthPaths = {
  '/health': {
    get: {
      tags: [this.healthTag.name],
      summary: 'Check server health.',
      description: 'Check server availability and health.',
      operationId: '/health',
      responses: {
        ...refOkResBodyDoc(
          '#/components/schemas/Healthy',
          'Server is healthy.',
        ),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
};

exports.healthSchemas = {
  Healthy: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Message that confirms the server is healthy.',
      },
    },
  },
};
