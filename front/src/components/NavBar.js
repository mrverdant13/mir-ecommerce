import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';

import { useAuthContext } from '../context/auth';
import LogInButton from './LogInButton';
import LogOutButton from './LogOutButton';

const signUpRoute = '/sign-up';
const profileRoute = '/me';

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();

  const showSignUpButton = location.pathname !== signUpRoute;
  const showProfileButton = location.pathname !== profileRoute;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          {user === null ? (
            <>
              {' '}
              <LogInButton />
              {showSignUpButton && (
                <Button color="inherit" onClick={() => navigate(signUpRoute)}>
                  Registrarme
                </Button>
              )}
            </>
          ) : (
            <>
              {showProfileButton && (
                <Button color="inherit" onClick={() => navigate(profileRoute)}>
                  Perfil
                </Button>
              )}
              <LogOutButton />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
