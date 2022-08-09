import { createContext, useCallback, useContext } from 'react';

import { getOrders as _getOrdersReq } from '../api/orders';
import useInfinitePagination from '../hooks/useInfinitePagination';

const ordersContext = createContext();

export const useOrdersContext = () => useContext(ordersContext);

const limit = 20;

export const OrdersProvider = ({ children }) => {
  const getOrdersReq = useCallback(async (offset = 0) => {
    console.debug('getOrders', { offset, limit });
    const { data } = await _getOrdersReq({ offset, limit });
    return data.orders;
  }, []);

  const {
    items: orders,
    hasMore,
    loading,
    error,
    loadItems: loadOrders,
  } = useInfinitePagination({
    getItems: getOrdersReq,
    checkIfHasMore: (newItems) => newItems.length === limit,
  });

  return (
    <ordersContext.Provider
      value={{
        orders,
        hasMore,
        loading,
        error,
        loadOrders,
      }}
    >
      {children}
    </ordersContext.Provider>
  );
};
