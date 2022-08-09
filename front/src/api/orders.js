import apiClient from './_client';

export const getOrders = async ({ offset = 0, limit = 50 }) => {
  try {
    return await apiClient.get('/orders', { params: { offset, limit } });
  } catch (e) {
    const status = e.response?.status;
    if (status === 400)
      throw new Error(e.response?.data?.message ?? 'Invalid data');
    if (status === 401) throw new Error('User not logged in');
    if (status === 500) throw new Error('Unexpected error');
    throw e;
  }
};
