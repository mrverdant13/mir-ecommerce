const { paginatorQueryParamsDocs } = require('../../../middlewares/paginator');
const {
  okResBodyDoc,
  simpleBadRequestResBodyDoc,
  simpleUnauthorizedResBodyDoc,
  simpleForbiddenResBodyDoc,
  fallbackInternalServerErrorResBodyDoc,
} = require('../docs/res-bodies');

exports.usersTag = {
  name: 'users',
  description: 'Users utilities.',
};

exports.usersPaths = {
  '/users': {
    get: {
      tags: [this.usersTag.name],
      summary: 'List users',
      description: 'Retrieve users.',
      operationId: '/users.get',
      security: [{ Bearer: [] }],
      parameters: [...paginatorQueryParamsDocs],
      responses: {
        ...okResBodyDoc(
          {
            type: 'object',
            properties: {
              total: {
                type: 'number',
                description: 'Total number of users.',
              },
              users: {
                type: 'array',
                description: 'Users.',
                items: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
            required: ['total', 'users'],
          },
          'Users retrieved.',
        ),
        ...simpleBadRequestResBodyDoc(),
        ...simpleUnauthorizedResBodyDoc(),
        ...simpleForbiddenResBodyDoc(),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
};

exports.usersSchemas = {
  User: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        format: 'objectID',
      },
      name: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      email: {
        type: 'string',
        format: 'email',
      },
      isAdmin: {
        type: 'boolean',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
      },
    },
    required: [
      '_id',
      'name',
      'lastName',
      'email',
      'isAdmin',
      'createdAt',
      'updatedAt',
    ],
  },
  NewUser: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minlength: 1,
      },
      lastName: {
        type: 'string',
        minlength: 1,
      },
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
      },
    },
    required: ['name', 'lastName', 'email', 'password'],
  },
};
