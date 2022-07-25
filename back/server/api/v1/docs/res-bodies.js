exports.simpleOkResBodyDoc = (description, bodySchemaRef) => ({
  200: {
    description,
    content: {
      'application/json': {
        schema: {
          $ref: bodySchemaRef,
        },
      },
    },
  },
});

exports.simpleCreatedResBodyDoc = (description, bodySchemaRef) => ({
  201: {
    description,
    content: {
      'application/json': {
        schema: {
          $ref: bodySchemaRef,
        },
      },
    },
  },
});

exports.fallbackInternalServerErrorResBodyDoc = {
  500: {
    description: 'Unexpected error',
  },
};
