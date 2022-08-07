import apiClient from './_client';

export const getCartItems = async () => {
  try {
    return await apiClient.get('/carts/mine');
  } catch (e) {
    const status = e.response?.status;
    if (status === 401) throw new Error('User not logged in');
    if (status === 500) throw new Error('Unexpected error');
    throw e;
  }
};

export const setProductInCart = async (productId, quantity) => {
  try {
    await apiClient.put(`/carts/mine`, { productId, quantity });
  } catch (e) {
    const status = e.response?.status;
    if (status === 400)
      throw new Error(e.response?.data?.message ?? 'Invalid data');
    if (status === 401) throw new Error('User not logged in');
    if (status === 404) throw new Error('Product not found');
    if (status === 500) throw new Error('Unexpected error');
    throw e;
  }
};
