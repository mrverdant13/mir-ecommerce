import { createContext, useCallback, useContext, useState } from 'react';

import {
  getCartItems as getCartItemsReq,
  placeOrder as placeOrderReq,
  setProductInCart as setProductInCartReq,
} from '../api/cart';

const cartContext = createContext();

export const useCartContext = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCartItems = useCallback(async () => {
    console.debug('getCartItems');
    setLoading(true);
    setError(null);
    try {
      const { data: cartItems } = await getCartItemsReq();
      setCartItems(cartItems);
    } catch (err) {
      setError(err.message ?? 'Unexpected error');
    }
    setLoading(false);
  }, []);

  const setProductInCart = useCallback(
    async (productId, quantity) => {
      console.debug('setProductInCart', '-', {
        productId,
        quantity,
      });
      setLoading(true);
      setError(null);
      try {
        await setProductInCartReq(productId, quantity);
      } catch (err) {
        setError(err.message ?? 'Unexpected error');
      }
      setLoading(false);
      await getCartItems();
    },
    [getCartItems],
  );

  const placeOrder = useCallback(async () => {
    console.debug('placeOrder');
    setLoading(true);
    setError(null);
    try {
      await placeOrderReq();
      setOrderPlaced(true);
    } catch (err) {
      setError(err.message ?? 'Unexpected error');
    }
    setLoading(false);
    await getCartItems();
  }, [getCartItems]);

  const resetOrderPlacement = useCallback(() => {
    console.debug('resetOrderPlacement');
    setOrderPlaced(false);
  }, []);

  return (
    <>
      <cartContext.Provider
        value={{
          cartItems,
          orderPlaced,
          loading,
          error,
          getCartItems,
          setProductInCart,
          placeOrder,
          resetOrderPlacement,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
};
