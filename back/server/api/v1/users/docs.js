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
