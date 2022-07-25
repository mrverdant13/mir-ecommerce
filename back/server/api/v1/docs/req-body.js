exports.requestBodyDoc = (description, bodySchemaRef) => ({
  description,
  required: true,
  content: {
    'application/json': {
      schema: {
        $ref: bodySchemaRef,
      },
    },
  },
});
