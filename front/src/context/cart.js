import { createContext, useContext, useState } from 'react';

import {
  getCartItems as getCartItemsReq,
  setProductInCart as setProductInCartReq,
} from '../api/cart';

const cartContext = createContext();

export const useCartContext = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCartItems = async () => {
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
  };

  const setProductInCart = async (productId, quantity) => {
    console.debug('setProductInCart', productId, quantity);
    setLoading(true);
    setError(null);
    try {
      await setProductInCartReq(productId, quantity);
    } catch (err) {
      setError(err.message ?? 'Unexpected error');
    }
    setLoading(false);
    await getCartItems();
  };

  return (
    <>
      <cartContext.Provider
        value={{
          cartItems,
          loading,
          error,
          getCartItems,
          setProductInCart,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
};
