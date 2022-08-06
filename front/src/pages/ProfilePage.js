import React, { useEffect } from 'react';

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';

import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';

import AuthGuard from '../components/AuthGuard';
import { useAuthContext } from '../context/auth';
import { emailRegExp } from '../regexps';

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfilePageContent />
    </AuthGuard>
  );
}

function ProfilePageContent() {
  const { user, loading, error, refreshProfile, editProfile } =
    useAuthContext();

  useEffect(() => {
    refreshProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Formik
      initialValues={{
        name: user.name,
        lastName: user.lastName,
        email: user.email,
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

        return errors;
      }}
      onSubmit={(values) => editProfile(values)}
    >
      {({ submitForm }) => (
        <Form>
          <Box
            sx={{
              maxWidth: 500,
              margin: 'auto',
              padding: 4,
            }}
          >
            <Typography variant="h4" textAlign="center">
              Perfil
            </Typography>
            {error && (
              <Typography variant="body1" color="error" textAlign="center">
                {error}
              </Typography>
            )}
            <TableContainer>
              <Table aria-label="profile table">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Nombre
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Field
                        sx={{
                          width: '100%',
                        }}
                        component={TextField}
                        name="name"
                        type="text"
                        autoComplete="given-name"
                        disabled={loading}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Apellido
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Field
                        sx={{
                          width: '100%',
                        }}
                        component={TextField}
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        disabled={loading}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Email
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Field
                        sx={{
                          width: '100%',
                        }}
                        component={TextField}
                        name="email"
                        type="email"
                        autoComplete="email"
                        disabled
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              sx={{
                mt: 5,
                width: '100%',
              }}
              size="large"
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={submitForm}
            >
              Actualizar
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
