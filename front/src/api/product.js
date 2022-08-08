import apiClient from './_client';

export const getProductItems = async () => {
    try {
      return await apiClient.get('/products');
    } catch (e) {
      const status = e.response?.status;
      if (status === 401) throw new Error('User not logged in');
      if (status === 500) throw new Error('Unexpected error');
      throw e;
    }
  };