const { requestBodyDoc } = require('../docs/req-body');
const {
  okResBodyDoc,
  simpleUnauthorizedResBodyDoc,
  fallbackInternalServerErrorResBodyDoc,
  simpleOkResBodyDoc,
  simpleBadRequestResBodyDoc,
} = require('../docs/res-bodies');

exports.cartsTag = {
  name: 'carts',
  description: 'Carts utilities',
};

exports.cartsPaths = {
  '/carts/mine': {
    get: {
      tags: [this.cartsTag.name],
      summary: 'Get my cart',
      description: 'Retrieve my cart.',
      operationId: '/my-cart.get',
      security: [{ Bearer: [] }],
      responses: {
        ...okResBodyDoc(
          {
            type: 'array',
            items: {
              $ref: '#/components/schemas/CartItem',
            },
          },
          'Cart retrieved.',
        ),
        ...simpleUnauthorizedResBodyDoc(),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
    put: {
      tags: [this.cartsTag.name],
      summary: 'Set product in my cart',
      description: 'Set product int my cart.',
      operationId: '/my-cart.put',
      security: [{ Bearer: [] }],
      requestBody: requestBodyDoc(
        'Cart item data',
        '#/components/schemas/SetCartItemData',
      ),
      responses: {
        ...simpleOkResBodyDoc('Cart item set.'),
        ...simpleUnauthorizedResBodyDoc(),
        ...simpleBadRequestResBodyDoc(),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
};

exports.cartsSchemas = {
  CartItem: {
    type: 'object',
    properties: {
      quantity: {
        type: 'number',
        minimum: 1,
      },
      product: {
        $ref: '#/components/schemas/Product',
      },
    },
    required: ['quantity'],
  },
  SetCartItemData: {
    type: 'object',
    properties: {
      productId: {
        type: 'string',
        format: 'objectID',
        description: 'Product ID',
      },
      quantity: {
        type: 'number',
        description: 'Quantity',
        minimum: 0,
      },
    },
    required: ['productId', 'quantity'],
  },
};
