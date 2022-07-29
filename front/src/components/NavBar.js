import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const signUpRoute = '/sign-up';

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const showSignUpButton = location.pathname !== signUpRoute;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          {showSignUpButton && (
            <Button color="inherit" onClick={() => navigate(signUpRoute)}>
              Registrarme
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
