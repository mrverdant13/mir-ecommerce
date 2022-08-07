import { CardMedia } from '@mui/material';
import React from 'react';

export default function ProductPhotosCarousel({ product }) {
  const photos = product.photos;
  const photo = photos[0];
  return (
    <CardMedia
      component="img"
      alt={product.name}
      title={product.name}
      sx={{
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      }}
      image={`${process.env.REACT_APP_PRODUCT_IMAGES_BASE_URL}${photo}`}
    />
  );
}
