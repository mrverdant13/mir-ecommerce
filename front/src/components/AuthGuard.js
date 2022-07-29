import React from 'react';

import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth';

export default function AuthGuard({ children }) {
  const { user } = useAuthContext();
  if (user === null) return <Navigate to="/" />;
  return <>{children}</>;
}
