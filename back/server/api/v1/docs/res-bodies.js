const resBodyDoc = (code, description, schema) => {
  if (code == null) {
    throw new Error('code is required');
  }
  if (description == null) {
    throw new Error('description is required');
  }
  const doc = { description };
  if (schema != null) doc.content = { 'application/json': { schema } };
  return { [code]: doc };
};

exports.okResBodyDoc = (schema, description = 'Ok') =>
  resBodyDoc(200, description, schema);

exports.simpleOkResBodyDoc = (description, schemaRef) =>
  this.okResBodyDoc(
    schemaRef == null ? null : { $ref: schemaRef },
    description,
  );

exports.createdResBodyDoc = (schema, description = 'Created') =>
  resBodyDoc(201, description, schema);

exports.simpleCreatedResBodyDoc = (description, schemaRef) =>
  this.createdResBodyDoc(
    schemaRef == null ? null : { $ref: schemaRef },
    description,
  );

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

exports.notFoundResBodyDoc = (schema, description = 'Not Found') =>
  resBodyDoc(404, description, schema);

exports.refNotFoundResBodyDoc = (schemaRef, description) => {
  if (schemaRef == null) {
    throw new Error('schema ref is required');
  }
  return this.notFoundResBodyDoc({ $ref: schemaRef }, description);
};

exports.conflictResBodyDoc = (schema, description = 'Conflict') =>
  resBodyDoc(409, description, schema);

exports.refConflictResBodyDoc = (schemaRef, description) => {
  if (schemaRef == null) {
    throw new Error('schema ref is required');
  }
  return this.conflictResBodyDoc({ $ref: schemaRef }, description);
};

exports.fallbackInternalServerErrorResBodyDoc = {
  500: {
    description: 'Unexpected error',
  },
};
