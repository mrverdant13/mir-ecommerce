const resBodyDoc = (code, schema, description) => {
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

const okResBodyDoc = (schema, description = 'Ok') =>
  resBodyDoc(200, schema, description);

const simpleOkResBodyDoc = (description) => okResBodyDoc(null, description);

const refOkResBodyDoc = (schemaRef, description) =>
  okResBodyDoc(schemaRef == null ? null : { $ref: schemaRef }, description);

const createdResBodyDoc = (schema, description = 'Created') =>
  resBodyDoc(201, schema, description);

const simpleCreatedResBodyDoc = (description) =>
  createdResBodyDoc(null, description);

const refCreatedResBodyDoc = (schemaRef, description) =>
  createdResBodyDoc(
    schemaRef == null ? null : { $ref: schemaRef },
    description,
  );

const badRequestResBodyDoc = (schema, description = 'Bad Request') =>
  resBodyDoc(400, schema, description);

const simpleBadRequestResBodyDoc = (description) =>
  badRequestResBodyDoc(null, description);

const refBadRequestResBodyDoc = (schemaRef, description) =>
  badRequestResBodyDoc(
    schemaRef == null ? null : { $ref: schemaRef },
    description,
  );

const unauthorizedResBodyDoc = (schema, description = 'Unauthorized') =>
  resBodyDoc(401, schema, description);

const simpleUnauthorizedResBodyDoc = (description) =>
  unauthorizedResBodyDoc(null, description);

const refUnauthorizedResBodyDoc = (schemaRef, description) =>
  unauthorizedResBodyDoc(
    schemaRef == null ? null : { $ref: schemaRef },
    description,
  );

const forbiddenResBodyDoc = (schema, description = 'Forbidden') =>
  resBodyDoc(403, schema, description);

const simpleForbiddenResBodyDoc = (description) =>
  forbiddenResBodyDoc(null, description);

const refForbiddenResBodyDoc = (schemaRef, description) =>
  forbiddenResBodyDoc(
    schemaRef == null ? null : { $ref: schemaRef },
    description,
  );

const notFoundResBodyDoc = (schema, description = 'Not Found') =>
  resBodyDoc(404, schema, description);

const simpleNotFoundResBodyDoc = (description) =>
  notFoundResBodyDoc(null, description);

const refNotFoundResBodyDoc = (schemaRef, description) =>
  notFoundResBodyDoc(
    schemaRef == null ? null : { $ref: schemaRef },
    description,
  );

const conflictResBodyDoc = (schema, description = 'Conflict') =>
  resBodyDoc(409, schema, description);

const simpleConflictResBodyDoc = (description) =>
  conflictResBodyDoc(null, description);

const refConflictResBodyDoc = (schemaRef, description) =>
  conflictResBodyDoc(
    schemaRef == null ? null : { $ref: schemaRef },
    description,
  );

const fallbackInternalServerErrorResBodyDoc = {
  500: {
    description: 'Unexpected error',
  },
};

module.exports = {
  // 200
  okResBodyDoc,
  simpleOkResBodyDoc,
  refOkResBodyDoc,
  // 201
  createdResBodyDoc,
  simpleCreatedResBodyDoc,
  refCreatedResBodyDoc,
  // 400
  badRequestResBodyDoc,
  simpleBadRequestResBodyDoc,
  refBadRequestResBodyDoc,
  // 401
  unauthorizedResBodyDoc,
  simpleUnauthorizedResBodyDoc,
  refUnauthorizedResBodyDoc,
  // 403
  forbiddenResBodyDoc,
  simpleForbiddenResBodyDoc,
  refForbiddenResBodyDoc,
  // 404
  notFoundResBodyDoc,
  simpleNotFoundResBodyDoc,
  refNotFoundResBodyDoc,
  // 409
  conflictResBodyDoc,
  simpleConflictResBodyDoc,
  refConflictResBodyDoc,
  // 500
  fallbackInternalServerErrorResBodyDoc,
};
