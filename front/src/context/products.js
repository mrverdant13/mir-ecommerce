import { createContext, useContext, useState } from 'react';

import {
  getProductItems,
} from '../api/product';

const productoContext = createContext();

export const useProductoContext = () => useContext(productoContext);

export const ProductoProvider = ({ children }) => {
  const [productItems, setProductItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProductIListtems = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: productoItems } = await getProductItems();
      setProductItems(productoItems);
    } catch (err) {
      setError(err.message ?? 'Unexpected error');
    }
    setLoading(false);
  };
  return (
    <>
      <productoContext.Provider
        value={{
          productItems,
          loading,
          error,
          getProductIListtems,
        }}
      >
        {children}
      </productoContext.Provider>
    </>
  );
};
