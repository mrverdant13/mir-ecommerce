exports.BadRequestErrorResponse = (message = 'Bad Request') => ({
  status: 400,
  message,
});

exports.UnauthorizedErrorResponse = (message = 'Unauthorized') => ({
  statusCode: 401,
  message,
});

exports.InternalServerErrorResponse = (message = 'Internal Server Error') => ({
  statusCode: 500,
  message,
});
