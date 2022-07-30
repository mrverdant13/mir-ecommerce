const { paginatorQueryParamsDocs } = require('../../../middlewares/paginator');
const { requestBodyDoc } = require('../docs/req-body');
const {
  okResBodyDoc,
  defaultUnauthorizedResBodyDoc,
  fallbackInternalServerErrorResBodyDoc,
  defaultForbiddenResBodyDoc,
  simpleCreatedResBodyDoc,
  defaultBadRequestResBodyDoc,
} = require('../docs/res-bodies');

exports.productsTag = {
  name: 'products',
  description: 'Products utilities',
};

exports.productsPaths = {
  '/products': {
    get: {
      tags: [this.productsTag.name],
      summary: 'List products',
      description: 'Retrieve products.',
      operationId: '/products.get',
      parameters: [...paginatorQueryParamsDocs],
      responses: {
        ...okResBodyDoc('Products retrieved.', {
          type: 'object',
          properties: {
            total: {
              type: 'number',
              description: 'Total number of products.',
            },
            products: {
              type: 'array',
              description: 'Products.',
              items: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
          required: ['total', 'products'],
        }),
        ...defaultBadRequestResBodyDoc,
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
    post: {
      tags: [this.productsTag.name],
      summary: 'Create product',
      description: 'Create product.',
      operationId: '/products.post',
      security: [{ Bearer: [] }],
      requestBody: requestBodyDoc(
        'New product data.',
        '#/components/schemas/NewProduct',
      ),
      responses: {
        ...simpleCreatedResBodyDoc(
          'Product created.',
          '#/components/schemas/Product',
        ),
        ...defaultUnauthorizedResBodyDoc,
        ...defaultForbiddenResBodyDoc,
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
};

exports.productsSchemas = {
  Product: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        format: 'objectID',
      },
      name: {
        type: 'string',
        minlength: 1,
      },
      description: {
        type: 'string',
        minlength: 1,
      },
      price: {
        type: 'number',
        minimum: 0,
      },
      groups: {
        type: 'array',
        minlength: 1,
        items: {
          type: 'string',
        },
      },
      categories: {
        type: 'array',
        minlength: 1,
        items: {
          type: 'string',
        },
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
      'description',
      'price',
      'groups',
      'categories',
      'createdAt',
      'updatedAt',
    ],
  },
  NewProduct: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minlength: 1,
      },
      description: {
        type: 'string',
        minlength: 1,
      },
      price: {
        type: 'number',
        minimum: 0,
      },
      groups: {
        type: 'array',
        minlength: 1,
        items: {
          type: 'string',
        },
      },
      categories: {
        type: 'array',
        minlength: 1,
        items: {
          type: 'string',
        },
      },
    },
    required: ['name', 'description', 'price', 'groups', 'categories'],
  },
};
