exports.BadRequestErrorResponse = (message = 'Bad Request') => ({
  statusCode: 400,
  message,
});

exports.UnauthorizedErrorResponse = (message = 'Unauthorized') => ({
  statusCode: 401,
  message,
});

exports.ForbiddenErrorResponse = (message = 'Forbidden') => ({
  statusCode: 403,
  message,
});

exports.NotFoundErrorResponse = (message = 'Not Found') => ({
  statusCode: 404,
  message,
});

exports.InternalServerErrorResponse = (message = 'Internal Server Error') => ({
  statusCode: 500,
  message,
});
