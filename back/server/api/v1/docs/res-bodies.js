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
    description,
    schemaRef == null ? null : { $ref: schemaRef },
  );

exports.createdResBodyDoc = (schema, description = 'Created') =>
  resBodyDoc(201, description, schema);

exports.simpleCreatedResBodyDoc = (description, schemaRef) =>
  this.createdResBodyDoc(
    description,
    schemaRef == null ? null : { $ref: schemaRef },
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
  return this.notFoundResBodyDoc(description, { $ref: schemaRef });
};

exports.conflictResBodyDoc = (schema, description = 'Conflict') =>
  resBodyDoc(409, description, schema);

exports.refConflictResBodyDoc = (schemaRef, description) => {
  if (schemaRef == null) {
    throw new Error('schema ref is required');
  }
  return this.conflictResBodyDoc(description, { $ref: schemaRef });
};

exports.fallbackInternalServerErrorResBodyDoc = {
  500: {
    description: 'Unexpected error',
  },
};
