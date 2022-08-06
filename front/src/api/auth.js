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
    if (status === 500) throw new Error('Unexpected error');
    throw e;
  }
};

export const logIn = async ({ email, password }) => {
  try {
    return await apiClient.post('/auth/log-in', {
      email,
      password,
    });
  } catch (e) {
    const status = e.response?.status;
    if (status === 401) throw new Error('Invalid email or password');
    if (status === 500) throw new Error('Unexpected error');
    throw e;
  }
};

export const me = async () => {
  try {
    return await apiClient.get('/auth/me');
  } catch (e) {
    const status = e.response?.status;
    if (status === 401) throw new Error('User not logged in');
    if (status === 500) throw new Error('Unexpected error');
    throw e;
  }
};

export const editProfile = async ({ name, lastName }) => {
  try {
    return await apiClient.patch('/auth/me', {
      name,
      lastName,
    });
  } catch (e) {
    const status = e.response?.status;
    if (status === 401) throw new Error('User not logged in');
    if (status === 500) throw new Error('Unexpected error');
    throw e;
  }
};

let reqInterceptor = null;
let resInterceptor = null;

export const setAuthHeader = (token, onInvalidToken) => {
  if (!token) return;
  removeAuthHeader();
  reqInterceptor = apiClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  resInterceptor = apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) onInvalidToken();
      return Promise.reject(error);
    },
  );
};

export const removeAuthHeader = () => {
  if (reqInterceptor != null) {
    apiClient.interceptors.request.eject(reqInterceptor);
    reqInterceptor = null;
  }
  if (resInterceptor != null) {
    apiClient.interceptors.response.eject(resInterceptor);
    resInterceptor = null;
  }
};
