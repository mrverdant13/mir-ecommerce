import React from 'react';

import { Box, Card, Typography } from '@mui/material';

import AuthGuard from '../components/AuthGuard';

export default function OrdersPage() {
  return (
    <Box sx={{ p: { xs: 'auto', sm: 2 } }}>
      <AuthGuard>
        <OrdersPageContent />
      </AuthGuard>
    </Box>
  );
}

function OrdersPageContent() {
  const content = (
    <>
      <Typography sx={{ mx: 2, my: 1 }} variant="h5">
        Orders
      </Typography>
    </>
  );

  return (
    <>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'column',
        }}
      >
        {content}
      </Box>
      <Card
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          minWidth: 200,
          maxWidth: 600,
          mx: 'auto',
        }}
        variant="outlined"
      >
        {content}
      </Card>
    </>
  );
}
