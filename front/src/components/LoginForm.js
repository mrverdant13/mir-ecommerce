import React, { useState } from 'react';

import {
  AlternateEmail,
  Password,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';

import { useAuthContext } from '../context/auth';

const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, logIn } = useAuthContext();
  return (
    <Box
      sx={{
        maxWidth: 300,
        mx: 'auto',
        my: 'auto',
        p: 3,
      }}
    >
      <Typography
        sx={{
          mb: 2,
          fontSize: 'h1',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
        variant="h5"
      >
        Iniciar sesión
      </Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={(values) => {
          const errors = {};

          // Email
          if (!values.email) {
            errors.email = 'Required';
          } else if (!emailRegExp.test(values.email)) {
            errors.email = 'Invalid email address';
          }

          // Password
          if (!values.password) {
            errors.password = 'Required';
          } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
          }

          return errors;
        }}
        onSubmit={(values) => logIn(values)}
      >
        {({ submitForm }) => (
          <Form>
            <Field
              sx={{
                my: 2,
                width: '100%',
              }}
              component={TextField}
              name="email"
              type="email"
              label="Email"
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmail />
                  </InputAdornment>
                ),
              }}
            />
            <Field
              sx={{
                my: 2,
                width: '100%',
              }}
              component={TextField}
              type={showPassword ? 'text' : 'password'}
              name="password"
              label="Contraseña"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {loading && <LinearProgress />}
            <br />
            {error && (
              <Typography
                sx={{
                  color: 'red',
                  my: 2,
                  textAlign: 'center',
                }}
                variant="body1"
              >
                {error}
              </Typography>
            )}
            <Button
              sx={{
                mt: 2,
                width: '100%',
              }}
              size="large"
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={submitForm}
            >
              Ingresar
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
