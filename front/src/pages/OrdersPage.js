import React, { useCallback, useEffect, useRef } from 'react';

import { Box, Card, Divider, Typography } from '@mui/material';

import AuthGuard from '../components/AuthGuard';
import OrderTile from '../components/OrderTile';
import { OrdersProvider, useOrdersContext } from '../context/orders';

export default function OrdersPage() {
  return (
    <Box sx={{ p: { xs: 'auto', sm: 2 } }}>
      <AuthGuard>
        <OrdersProvider>
          <OrdersPageContent />
        </OrdersProvider>
      </AuthGuard>
    </Box>
  );
}

function OrdersPageContent() {
  const { orders, hasMore, loading, error, loadOrders } = useOrdersContext();
  const initialPageLoaded = useRef(false);
  const onScroll = useCallback(
    (e) => {
      const scrollExtent = e.target.documentElement.scrollHeight;
      const scrollPosition =
        e.target.documentElement.scrollTop + window.innerHeight;
      const threshold = 100;
      const isBottom = scrollPosition + threshold >= scrollExtent;
      const shouldLoadMore = isBottom && hasMore && !loading;
      if (shouldLoadMore) loadOrders();
    },
    [hasMore, loading, loadOrders],
  );
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);
  useEffect(() => {
    if (initialPageLoaded.current) return;
    console.log('TEST');
    loadOrders();
    initialPageLoaded.current = true;
  }, [loadOrders]);

  const content = (
    <>
      <Typography sx={{ mx: 2, my: 1 }} variant="h5">
        Orders
      </Typography>
      <Divider />
      {orders && (
        <>
          <Box sx={{ p: 2 }}>
            {orders.map((order, index) => (
              <React.Fragment key={order._id}>
                {index !== 0 && <Divider sx={{ my: 2 }} />}
                <OrderTile order={order} />
              </React.Fragment>
            ))}
          </Box>
        </>
      )}
      {loading && (
        <Box sx={{ p: { xs: 'auto', sm: 2 } }}>
          <Typography variant="h5" textAlign="center">
            Loading
          </Typography>
        </Box>
      )}
      {error && (
        <Typography variant="h5" textAlign="center">
          {error}
        </Typography>
      )}
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
