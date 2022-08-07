import { Add, Check, Delete, Remove, RestartAlt } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { useCartContext } from '../context/cart';
import ProductPhotosCarousel from './ProductPhotosCarousel';

export default function CartItemTile({ item }) {
  const heights = {
    xs: 80,
    sm: 100,
    // md: 120,
  };
  return (
    <Box
      sx={{
        display: 'flex',
        mb: 1,
        height: heights,
        width: '100%',
      }}
    >
      <Box sx={{ width: heights, minWidth: heights }}>
        <ProductPhotosCarousel product={item.product} />
      </Box>
      <Box sx={{ flex: 1, height: '100%', pl: 1 }}>
        <CartItemData item={item} />
      </Box>
    </Box>
  );
}

function CartItemData({ item }) {
  const product = item.product;
  const { setProductInCart } = useCartContext();
  const [quantity, setQuantity] = useState(item.quantity);
  const iconButtonSx = { fontSize: { xs: 12, sm: 'inherit' } };
  const quantityIsEdited = Boolean(+quantity !== item.quantity);
  const resetQuantity = () => {
    setQuantity(item.quantity);
  };
  const updateQuantity = async () => {
    await setProductInCart(product._id, quantity);
  };
  const removeFromCart = async () => {
    await setProductInCart(product._id, 0);
  };

  const resetIconButton = (
    <IconButton
      color="primary"
      disabled={!quantityIsEdited}
      sx={{ display: { xs: 'flex', sm: 'none' } }}
      aria-label="reset quantity"
      size="small"
      onClick={resetQuantity}
    >
      <RestartAlt sx={iconButtonSx} />
    </IconButton>
  );

  const updateIconButton = (
    <IconButton
      color="primary"
      disabled={!quantityIsEdited}
      sx={{ display: { xs: 'flex', sm: 'none' } }}
      aria-label="apply new quantity"
      size="small"
      onClick={updateQuantity}
    >
      <Check sx={iconButtonSx} />
    </IconButton>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            mr: 1,
            fontWeight: 'bold',
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
          }}
          variant="body2"
        >
          {product.name}
        </Typography>
        <Typography sx={{ fontWeight: 'bold' }} variant="body1">
          ${product.price * item.quantity}
        </Typography>
      </Box>
      <Typography variant="caption">${product.price}</Typography>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 0,
            mt: {
              xs: 0,
              sm: 1,
            },
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <IconButton
            aria-label={`remove 1 ${product.name}`}
            size="small"
            onClick={() => setQuantity(quantity ? +quantity - 1 : 0)}
          >
            <Remove sx={iconButtonSx} />
          </IconButton>
          <InputBase
            sx={{
              fontSize: {
                xs: 12,
                sm: 14,
              },
            }}
            size="small"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            inputProps={{
              'aria-label': `${quantity} unit${+quantity !== 1 ? 's' : ''} of ${
                product.name
              }`,
              pattern: '[0-9]+',
              style: {
                textAlign: 'center',
                padding: 0,
                width: `${`${quantity}`.length * 10}px`,
              },
            }}
          />
          <IconButton
            aria-label={`add 1 ${product.name}`}
            size="small"
            onClick={() => setQuantity(+quantity + 1)}
          >
            <Add sx={iconButtonSx} />
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {quantityIsEdited ? (
          <Tooltip title="Restart quantity">{resetIconButton}</Tooltip>
        ) : (
          resetIconButton
        )}
        <Button
          aria-label="reset quantity"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          disabled={!quantityIsEdited}
          variant="text"
          size="small"
          startIcon={<RestartAlt />}
          onClick={resetQuantity}
        >
          Reset
        </Button>
        <Divider
          sx={{ mx: 1 }}
          variant="middle"
          flexItem
          orientation="vertical"
        />
        {quantityIsEdited ? (
          <Tooltip title="Apply new quantity">{updateIconButton}</Tooltip>
        ) : (
          updateIconButton
        )}
        <Button
          aria-label="apply new quantity"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          disabled={!quantityIsEdited}
          variant="text"
          size="small"
          startIcon={<Check />}
          onClick={updateQuantity}
        >
          Save
        </Button>
        <Divider
          sx={{ mx: 1 }}
          variant="middle"
          flexItem
          orientation="vertical"
        />
        <Tooltip title="Remove product">
          <IconButton
            color="primary"
            sx={{ display: { xs: 'flex', sm: 'none' } }}
            aria-label="remove product"
            size="small"
            onClick={removeFromCart}
          >
            <Delete sx={iconButtonSx} />
          </IconButton>
        </Tooltip>
        <Button
          aria-label="remove product"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          variant="text"
          size="small"
          startIcon={<Delete />}
          onClick={removeFromCart}
        >
          Remove
        </Button>
      </Box>
    </Box>
  );
}
