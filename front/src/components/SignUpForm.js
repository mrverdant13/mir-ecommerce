import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AccountCircle,
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
import { useSignUpContext } from '../context/signUp';

const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export default function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const { loading, error, done, signUp } = useSignUpContext();
  const { user } = useAuthContext();
  useEffect(() => {
    if (done || user !== null) navigate('/');
  }, [done, user, navigate]);
  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        my: 'auto',
        px: 3,
      }}
    >
      <Typography
        sx={{
          mt: 5,
          mb: 2,
          fontSize: 'h1',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
        variant="h4"
      >
        Nueva cuenta
      </Typography>
      <Formik
        initialValues={{
          name: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validate={(values) => {
          const errors = {};

          // Name
          if (!values.name) {
            errors.name = 'Required';
          }

          // Last Name
          if (!values.lastName) {
            errors.lastName = 'Required';
          }

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

          // Confirm Password
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
          } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords must match';
          }

          return errors;
        }}
        onSubmit={(values) => signUp(values)}
        // onSubmit={(values, { setSubmitting: setIsSubmitting }) => {
        //   setTimeout(() => {
        //     setIsSubmitting(false);
        //     alert(JSON.stringify(values, null, 2));
        //   }, 500);
        // }}
      >
        {({ submitForm }) => (
          <Form>
            <Field
              sx={{
                my: 2,
                width: '100%',
              }}
              component={TextField}
              name="name"
              type="text"
              label="Nombre"
              autoComplete="given-name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
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
              name="lastName"
              type="text"
              label="Apellido"
              autoComplete="family-name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
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
              autoComplete="new-password"
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
            <Field
              sx={{
                my: 2,
                width: '100%',
              }}
              component={TextField}
              type={showPasswordConfirm ? 'text' : 'password'}
              name="confirmPassword"
              label="Confirmar contraseña"
              autoComplete="new-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() =>
                        setShowPasswordConfirm(!showPasswordConfirm)
                      }
                      edge="end"
                    >
                      {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
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
                my: 2,
                width: '100%',
              }}
              size="large"
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={submitForm}
            >
              Crear cuenta
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
