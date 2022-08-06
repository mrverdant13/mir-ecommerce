const { paginatorQueryParamsDocs } = require('../../../middlewares/paginator');
const { requestBodyDoc } = require('../docs/req-body');
const {
  okResBodyDoc,
  simpleBadRequestResBodyDoc,
  fallbackInternalServerErrorResBodyDoc,
  refCreatedResBodyDoc,
  simpleUnauthorizedResBodyDoc,
  simpleForbiddenResBodyDoc,
  simpleCreatedResBodyDoc,
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
      parameters: [
        ...paginatorQueryParamsDocs,
        {
          name: 'group',
          in: 'query',
          description: 'Filter by group',
          required: false,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'category',
          in: 'query',
          description: 'Filter by category',
          required: false,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        ...okResBodyDoc(
          {
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
          },
          'Products retrieved.',
        ),
        ...simpleBadRequestResBodyDoc(),
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
        ...refCreatedResBodyDoc(
          '#/components/schemas/Product',
          'Product created.',
        ),
        ...simpleUnauthorizedResBodyDoc(),
        ...simpleForbiddenResBodyDoc(),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
  '/products/{productId}/photo': {
    post: {
      tags: [this.productsTag.name],
      summary: 'Add product photo',
      description: 'Add product photo.',
      operationId: '/products/productId/photo.post',
      security: [{ Bearer: [] }],
      parameters: [
        {
          name: 'productId',
          in: 'path',
          description: 'Product ID',
          required: true,
          schema: {
            type: 'string',
            format: 'objectID',
          },
        },
      ],
      requestBody: {
        description: 'Product photo data.',
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                photo: {
                  type: 'string',
                  format: 'binary',
                  description:
                    'Product photo. Only JPEG and PNG images are supported.',
                },
              },
              required: ['photo'],
            },
          },
        },
      },
      responses: {
        ...simpleCreatedResBodyDoc('Product photo added.'),
        ...simpleUnauthorizedResBodyDoc(),
        ...simpleForbiddenResBodyDoc(),
        ...simpleBadRequestResBodyDoc(),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
  '/products/groups': {
    get: {
      tags: [this.productsTag.name],
      summary: 'List product groups',
      description: 'Retrieve product groups.',
      operationId: '/products/groups.get',
      responses: {
        ...okResBodyDoc(
          {
            type: 'array',
            description: 'Product groups.',
            items: {
              type: 'string',
            },
          },
          'Product groups retrieved.',
        ),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
  '/products/groups/{group}': {
    put: {
      tags: [this.productsTag.name],
      summary: 'Update products group',
      description: 'Update products group.',
      operationId: '/products/groups/:group.put',
      security: [{ Bearer: [] }],
      parameters: [
        {
          name: 'group',
          in: 'path',
          description: 'Group to update.',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'New group data.',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                newGroup: {
                  type: 'string',
                  description: 'New group.',
                },
              },
            },
          },
        },
      },
      responses: {
        ...okResBodyDoc('Group updated for all products.'),
        ...simpleUnauthorizedResBodyDoc(),
        ...simpleForbiddenResBodyDoc(),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
  '/products/groups/{group}/categories': {
    get: {
      tags: [this.productsTag.name],
      summary: 'List product categories by group',
      description: 'Retrieve product categories by group.',
      operationId: '/products/groups/:group/categories.get',
      parameters: [
        {
          name: 'group',
          in: 'path',
          description: 'Group to retrieve categories.',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        ...okResBodyDoc(
          {
            type: 'array',
            description: 'Product categories.',
            items: {
              type: 'string',
            },
          },
          'Product categories retrieved.',
        ),
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
      photos: {
        type: 'array',
        items: {
          type: 'string',
          format: 'path',
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
