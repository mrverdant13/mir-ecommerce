import { createContext, useContext, useState } from 'react';
import { signUp as signUpReq } from '../api/auth';

const signUpContext = createContext();

export const useSignUpContext = () => useContext(signUpContext);

export const SignUpProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  const signUp = async ({ name, lastName, email, password }) => {
    setLoading(true);
    setError(null);
    setDone(false);

    try {
      await signUpReq({ name, lastName, email, password });
      setDone(true);
    } catch (err) {
      setError(err.message ?? 'Unexpected error');
    }

    setLoading(false);
  };

  return (
    <signUpContext.Provider
      value={{
        loading,
        error,
        done,
        signUp,
      }}
    >
      {children}
    </signUpContext.Provider>
  );
};
