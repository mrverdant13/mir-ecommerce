import React, { useEffect } from 'react';

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';

import AuthGuard from '../components/AuthGuard';
import { useAuthContext } from '../context/auth';

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfilePageContent />
    </AuthGuard>
  );
}

function ProfilePageContent() {
  const { user, error, refreshProfile } = useAuthContext();

  useEffect(() => {
    refreshProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rowsData = [
    {
      label: 'Nombre',
      value: user.name,
    },
    {
      label: 'Apellido',
      value: user.lastName,
    },
    {
      label: 'Email',
      value: user.email,
    },
  ];

  return (
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
            {rowsData.map((row) => (
              <TableRow key={row.label}>
                <TableCell component="th" scope="row">
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {row.label}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body1">{row.value}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
