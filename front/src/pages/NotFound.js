import React from 'react';

import Typography from '@mui/material/Typography';

export default function NotFound() {
  return (
    <Typography
      m="auto"
      maxWidth="500px"
      textAlign="center"
      variant="h3"
      component="h1"
      gutterBottom
    >
      No pudimos encontrar la página que estás buscando
    </Typography>
  );
}
