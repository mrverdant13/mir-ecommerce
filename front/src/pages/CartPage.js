import React, { useEffect, useMemo } from 'react';

import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Snackbar,
  Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const {
    cartItems,
    orderPlaced,
    loading,
    error,
    getCartItems,
    placeOrder,
    resetOrderPlacement,
  } = useCartContext();
  const cartItemsCount = useMemo(() => cartItems?.length ?? 0, [cartItems]);
  useEffect(() => {
    getCartItems();
    resetOrderPlacement();
    return () => {
      resetOrderPlacement();
    };
  }, [getCartItems, resetOrderPlacement]);
  useEffect(() => {
    if (orderPlaced) navigate('/my-orders');
  }, [orderPlaced, navigate]);

  const content = (
    <>
      <Typography sx={{ mx: 2, my: 1 }} variant="h5">
        Cart
      </Typography>
      <Divider />
      {cartItems == null ? (
        <>
          {loading && (
            <Container
              sx={{
                minHeight: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" textAlign="center">
                Loading
              </Typography>
            </Container>
          )}
          {error && (
            <Typography variant="h5" textAlign="center">
              {error}
            </Typography>
          )}
        </>
      ) : cartItemsCount > 0 ? (
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
              Total
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }} variant="body1">
              $
              {cartItems
                .map((item) => item.product.price * item.quantity)
                .reduce((partialSum, s) => partialSum + s, 0)}
            </Typography>
          </Box>
          <Button
            sx={{
              mx: 2,
              mb: 2,
            }}
            variant="contained"
            color="primary"
            size="small"
            onClick={placeOrder}
            disabled={loading}
          >
            <Typography variant="subtitle1">Place Order</Typography>
          </Button>
        </>
      ) : (
        <Container
          sx={{
            minHeight: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" textAlign="center">
            Cart is empty
          </Typography>
        </Container>
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
      <Snackbar
        open={orderPlaced}
        onClose={resetOrderPlacement}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={resetOrderPlacement}
          severity="success"
          sx={{ width: '100%' }}
        >
          Order placed successfully
        </Alert>
      </Snackbar>
    </>
  );
}
