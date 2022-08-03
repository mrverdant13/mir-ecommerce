const { requestBodyDoc } = require('../docs/req-body');
const {
  refCreatedResBodyDoc,
  fallbackInternalServerErrorResBodyDoc,
  createdResBodyDoc,
  simpleUnauthorizedResBodyDoc,
  refOkResBodyDoc,
} = require('../docs/res-bodies');

exports.authTag = {
  name: 'auth',
  description: 'Authentication utilities.',
};

exports.authPaths = {
  '/auth/sign-up': {
    post: {
      tags: [this.authTag.name],
      summary: 'Sign up',
      description: 'Create user profile (non-admin).',
      operationId: '/auth/sign-up',
      requestBody: requestBodyDoc(
        'New user profile data.',
        '#/components/schemas/NewUser',
      ),
      responses: {
        ...refCreatedResBodyDoc(
          '#/components/schemas/User',
          'Non-admin user profile created.',
        ),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
  '/auth/log-in': {
    post: {
      tags: [this.authTag.name],
      summary: 'Log in',
      description: 'Log in user and get a JWT.',
      operationId: '/auth/log-in',
      requestBody: requestBodyDoc(
        'User credentials.',
        '#/components/schemas/UserCredentials',
      ),
      responses: {
        ...createdResBodyDoc(
          {
            allOf: [
              { $ref: '#/components/schemas/User' },
              {
                type: 'object',
                properties: {
                  jwt: {
                    type: 'string',
                    format: 'JWT',
                  },
                },
                required: ['jwt'],
              },
            ],
          },
          'User logged in.',
        ),
        ...simpleUnauthorizedResBodyDoc('Invalid credentials.'),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
  '/auth/me': {
    get: {
      tags: [this.authTag.name],
      summary: 'Get user profile',
      description: 'Get user profile.',
      operationId: '/auth/me',
      security: [{ Bearer: [] }],
      responses: {
        ...refOkResBodyDoc(
          '#/components/schemas/User',
          'User profile retrieved.',
        ),
        ...simpleUnauthorizedResBodyDoc(),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
};

exports.authSchemas = {
  UserCredentials: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
      },
    },
    required: ['email', 'password'],
  },
};
