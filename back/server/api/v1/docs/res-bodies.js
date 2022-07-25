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

exports.createdResBodyDoc = (description, schema) => ({
  201: {
    description,
    content: { 'application/json': { schema } },
  },
});

exports.simpleCreatedResBodyDoc = (description, schemaRef) =>
  this.createdResBodyDoc(description, { $ref: schemaRef });

exports.simpleUnauthorizedResBodyDoc = (description) => ({
  401: { description },
});

exports.fallbackInternalServerErrorResBodyDoc = {
  500: {
    description: 'Unexpected error',
  },
};
