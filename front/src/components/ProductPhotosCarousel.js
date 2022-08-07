import React from 'react';

import { CardMedia } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

export default function ProductPhotosCarousel({ product }) {
  const photos = product.photos;
  const photosCount = photos?.length ?? 0;
  const showButtons = photosCount > 1;
  return (
    <Carousel
      indicators={false}
      height={'100%'}
      navButtonsAlwaysInvisible={!showButtons}
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      {photos.map((photo) => (
        <CardMedia
          key={photo}
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
      ))}
    </Carousel>
  );
}
