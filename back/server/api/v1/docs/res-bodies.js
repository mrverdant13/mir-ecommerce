exports.okResBodyDoc = (description, schema) => ({
  200: {
    description,
    content: { 'application/json': { schema } },
  },
});

exports.simpleOkResBodyDoc = (description, schemaRef) =>
  this.okResBodyDoc(description, { $ref: schemaRef });

exports.createdResBodyDoc = (description, schema) => ({
  201: {
    description,
    content: { 'application/json': { schema } },
  },
});

exports.simpleCreatedResBodyDoc = (description, schemaRef) =>
  this.createdResBodyDoc(description, { $ref: schemaRef });

exports.simpleBadRequestResBodyDoc = (description) => ({
  400: { description },
});

exports.defaultBadRequestResBodyDoc =
  this.simpleBadRequestResBodyDoc('Bad request');

exports.simpleUnauthorizedResBodyDoc = (description) => ({
  401: { description },
});

exports.defaultUnauthorizedResBodyDoc =
  this.simpleUnauthorizedResBodyDoc('Unauthorized');

exports.simpleForbiddenResBodyDoc = (description) => ({
  403: { description },
});

exports.defaultForbiddenResBodyDoc =
  this.simpleForbiddenResBodyDoc('Forbidden');

exports.fallbackInternalServerErrorResBodyDoc = {
  500: {
    description: 'Unexpected error',
  },
};
