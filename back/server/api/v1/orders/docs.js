const { paginatorQueryParamsDocs } = require('../../../middlewares/paginator');
const {
  okResBodyDoc,
  simpleBadRequestResBodyDoc,
  simpleUnauthorizedResBodyDoc,
  fallbackInternalServerErrorResBodyDoc,
  simpleConflictResBodyDoc,
  simpleNotFoundResBodyDoc,
} = require('../docs/res-bodies');

exports.ordersTag = {
  name: 'orders',
  description: 'Orders utilities',
};

exports.ordersPaths = {
  '/orders': {
    get: {
      tags: [this.ordersTag.name],
      summary: 'Get orders',
      description: 'Retrieve orders.',
      operationId: '/orders.get',
      security: [{ Bearer: [] }],
      parameters: [...paginatorQueryParamsDocs],
      responses: {
        ...okResBodyDoc(
          {
            type: 'object',
            properties: {
              total: {
                type: 'number',
                description: 'Total number of orders.',
              },
              orders: {
                type: 'array',
                description: 'Orders.',
                items: {
                  $ref: '#/components/schemas/Order',
                },
              },
            },
            required: ['total', 'orders'],
          },
          'Orders retrieved.',
        ),
        ...simpleBadRequestResBodyDoc(),
        ...simpleUnauthorizedResBodyDoc(),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
    post: {
      tags: [this.ordersTag.name],
      summary: 'Place order',
      description: 'Place order.',
      operationId: '/orders.post',
      security: [{ Bearer: [] }],
      responses: {
        ...simpleConflictResBodyDoc('The user cart is empty.'),
        ...simpleUnauthorizedResBodyDoc(),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
  '/orders/{orderId}/confirm': {
    patch: {
      tags: [this.ordersTag.name],
      summary: 'Confirm order',
      description: 'Confirm order.',
      operationId: '/orders.:orderId.confirm',
      security: [{ Bearer: [] }],
      parameters: [
        {
          name: 'orderId',
          in: 'path',
          description: 'Order ID.',
          required: true,
          schema: {
            type: 'string',
            format: 'objectID',
          },
        },
      ],
      responses: {
        ...simpleUnauthorizedResBodyDoc(),
        ...simpleNotFoundResBodyDoc('Order not found.'),
        ...simpleConflictResBodyDoc(),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
  '/orders/{orderId}/reject': {
    patch: {
      tags: [this.ordersTag.name],
      summary: 'Reject order',
      description: 'Reject order.',
      operationId: '/orders.:orderId.reject',
      security: [{ Bearer: [] }],
      parameters: [
        {
          name: 'orderId',
          in: 'path',
          description: 'Order ID.',
          required: true,
          schema: {
            type: 'string',
            format: 'objectID',
          },
        },
      ],
      responses: {
        ...simpleUnauthorizedResBodyDoc(),
        ...simpleNotFoundResBodyDoc('Order not found.'),
        ...simpleConflictResBodyDoc(),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
  '/orders/{orderId}/deliver': {
    patch: {
      tags: [this.ordersTag.name],
      summary: 'Deliver order',
      description: 'Deliver order.',
      operationId: '/orders.:orderId.deliver',
      security: [{ Bearer: [] }],
      parameters: [
        {
          name: 'orderId',
          in: 'path',
          description: 'Order ID.',
          required: true,
          schema: {
            type: 'string',
            format: 'objectID',
          },
        },
      ],
      responses: {
        ...simpleUnauthorizedResBodyDoc(),
        ...simpleNotFoundResBodyDoc('Order not found.'),
        ...simpleConflictResBodyDoc(),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
};

exports.ordersSchemas = {
  Order: {
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        format: 'objectID',
        description: 'User ID',
      },
      confirmedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Confirmation date',
      },
      rejectedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Rejection date',
      },
      deliveredAt: {
        type: 'string',
        format: 'date-time',
        description: 'Delivery date',
      },
      products: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/OrderProduct',
        },
        description: 'Products',
      },
    },
    required: ['userId', 'products'],
  },
  OrderProduct: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Product name',
      },
      description: {
        type: 'string',
        description: 'Product description',
      },
      photos: {
        type: 'array',
        items: {
          type: 'string',
          format: 'path',
          description: 'Product photo',
        },
        description: 'Product photos',
      },
      price: {
        type: 'number',
        description: 'Product price',
      },
      quantity: {
        type: 'number',
        description: 'Product quantity',
      },
    },
    required: ['name', 'description', 'photos', 'price', 'quantity'],
  },
};
