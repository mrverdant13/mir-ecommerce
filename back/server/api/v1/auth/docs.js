const { requestBodyDoc } = require('../docs/req-body');
const {
  simpleCreatedResBodyDoc,
  fallbackInternalServerErrorResBodyDoc,
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
      operationId: '/auth/signup',
      requestBody: requestBodyDoc(
        'New user profile data.',
        '#/components/schemas/NewUser',
      ),
      responses: {
        ...simpleCreatedResBodyDoc(
          'Non-admin user profile created.',
          '#/components/schemas/User',
        ),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
};
