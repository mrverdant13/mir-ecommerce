import React, { useEffect, useMemo } from 'react';

import { Box, Card, Container, Divider, Typography } from '@mui/material';

import AuthGuard from '../components/AuthGuard';
import CartItemTile from '../components/CartItemTile';
import { useCartContext } from '../context/cart';

export default function CartPage() {
  return (
    <Box sx={{ p: { xs: 'auto', sm: 2 } }}>
      <AuthGuard>
        <CartPageContent />
      </AuthGuard>
    </Box>
  );
}

function CartPageContent() {
  const { cartItems, loading, error, getCartItems } = useCartContext();
  const cartItemsCount = useMemo(() => cartItems?.length ?? 0, [cartItems]);

  useEffect(() => {
    getCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const content = (
    <>
      <Typography sx={{ mx: 2, my: 1 }} variant="h5">
        Cart
      </Typography>
      <Divider />
      {loading && (
        <Container>
          <Typography variant="h5" textAlign="center">
            Loading
          </Typography>
        </Container>
      )}
      {error && (
        <Typography variant="h5" textAlign="center">
          {error}
        </Typography>
      )}
      {cartItemsCount > 0 && (
        <>
          <Box sx={{ p: 2 }}>
            {cartItems.map((item, index) => (
              <React.Fragment key={item.product._id}>
                {index !== 0 && <Divider sx={{ my: 2 }} />}
                <CartItemTile item={item} />
              </React.Fragment>
            ))}
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="body1">
              Subtotal
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }} variant="body1">
              $
              {cartItems
                .map((item) => item.product.price * item.quantity)
                .reduce((partialSum, s) => partialSum + s, 0)}
            </Typography>
          </Box>
        </>
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
