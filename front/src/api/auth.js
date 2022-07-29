import apiClient from './_client';

export const signUp = async ({ name, lastName, email, password }) => {
  try {
    return await apiClient.post('/auth/sign-up', {
      name,
      lastName,
      email,
      password,
    });
  } catch (e) {
    const status = e.response?.status;
    if (status === 500) throw new Error('Unexpected error'); // Override server message.
    throw e;
  }
};
