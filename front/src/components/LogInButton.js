import { useEffect, useState } from 'react';

import { Button, Popover } from '@mui/material';

import { useAuthContext } from '../context/auth';
import LoginForm from './LoginForm';

export default function LogInButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) hideLoginForm();
  }, [user]);

  const showLoginForm = (event) => setAnchorEl(event.currentTarget);

  const hideLoginForm = () => setAnchorEl(null);

  const loginFormIsVisible = Boolean(anchorEl);
  const id = loginFormIsVisible ? 'login-form' : undefined;

  return (
    <div>
      <Button aria-describedby={id} color="inherit" onClick={showLoginForm}>
        Acceder
      </Button>
      <Popover
        id={id}
        open={loginFormIsVisible}
        anchorEl={anchorEl}
        onClose={hideLoginForm}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <LoginForm />
      </Popover>
    </div>
  );
}
