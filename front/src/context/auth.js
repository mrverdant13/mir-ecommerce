import { createContext, useContext, useEffect, useState } from 'react';

import {
  logIn as logInReq,
  removeAuthHeader,
  setAuthHeader,
} from '../api/auth';

const authContext = createContext();

export const useAuthContext = () => useContext(authContext);

const userStorageKey = 'user';
const jwtStorageKey = 'jwt';

export const AuthProvider = ({ children }) => {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem(userStorageKey);
    const jwt = localStorage.getItem(jwtStorageKey);
    setUser(user !== null ? JSON.parse(user) : null);
    setJwt(jwt);
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    if (user && jwt) {
      localStorage.setItem(userStorageKey, JSON.stringify(user));
      localStorage.setItem(jwtStorageKey, jwt);
      setAuthHeader(jwt, () => logOut());
    } else {
      localStorage.removeItem(userStorageKey);
      localStorage.removeItem(jwtStorageKey);
      removeAuthHeader();
    }
  }, [hydrated, user, jwt]);

  const logIn = async ({ email, password }) => {
    console.debug('logIn');
    setLoading(true);
    setError(null);
    try {
      const { data } = await logInReq({ email, password });
      const { jwt, ...user } = data;
      setUser(user);
      setJwt(jwt);
    } catch (err) {
      setError(err.message ?? 'Unexpected error');
    }
    setLoading(false);
  };

  const logOut = () => {
    console.debug('logOut');
    setUser(null);
    setJwt(null);
  };

  return (
    <authContext.Provider
      value={{
        user,
        loading,
        error,
        logIn,
        logOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
