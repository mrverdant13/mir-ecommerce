import React from 'react';

import { Box, CardMedia, Chip, Stack, Typography } from '@mui/material';

import { format } from 'date-fns';

const productWidth = 80;

export default function OrderTile({ order }) {
  const status = (() => {
    if (order.deliveredAt) return { label: 'Delivered', color: 'success' };
    if (order.rejectedAt) return { label: 'Rejected', color: 'error' };
    if (order.confirmedAt) return { label: 'Confirmed', color: 'info' };
    return { label: 'Pending', color: undefined };
  })();
  return (
    <Stack>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          mb: 0.5,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 0.5 }}>
          {format(new Date(order.createdAt), 'MMMM do, yyyy H:mma')}
        </Typography>
        <Chip label={status.label} color={status.color} size="small" />
      </Box>
      <Stack
        direction="row"
        spacing={1}
        sx={{ overflow: 'auto', pb: 0.5, mb: 0.5 }}
      >
        {order.products.map((product) => (
          <Stack
            key={product.name}
            sx={{
              width: productWidth,
              minWidth: productWidth,
            }}
          >
            <CardMedia
              component="img"
              alt={product.name}
              title={product.name}
              sx={{
                height: productWidth,
                objectFit: 'cover',
              }}
              image={`${process.env.REACT_APP_PRODUCT_IMAGES_BASE_URL}${product.photos[0]}`}
            />
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="caption">
              {product.quantity} x ${product.price}
            </Typography>
            <Typography variant="caption">
              ${product.quantity * product.price}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
