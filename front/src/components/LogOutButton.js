import React from 'react';

import { Button } from '@mui/material';

import { useAuthContext } from '../context/auth';

export default function LogOutButton() {
  const { logOut } = useAuthContext();
  return (
    <Button color="inherit" onClick={() => logOut()}>
      Cerrar Sesión
    </Button>
  );
}
