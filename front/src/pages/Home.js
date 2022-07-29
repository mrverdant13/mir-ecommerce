import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button } from '@mui/material';

import homeCoupleImg from '../assets/images/home-couple.jpg';

function GenderButton(props) {
  const { label, destination } = props;
  const navigate = useNavigate();
  return (
    <Button
      sx={[
        {
          typography: {
            xs: 'h5',
            sm: 'h4',
            md: 'h3',
            lg: 'h2',
          },
          color: 'black',
          border: '5px solid transparent',
          my: {
            xs: 0.5,
            sm: 1,
            md: 1.5,
            lg: 2,
          },
        },
        {
          '&:hover': {
            border: '5px solid black',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        },
      ]}
      size="large"
      onClick={() => navigate(destination)}
    >
      {label}
    </Button>
  );
}

export default function Home() {
  return (
    <>
      <Box
        sx={{
          width: 1,
          maxWidth: 'xl',
          mx: 'auto',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          sx={{
            width: '100%',
            objectFit: 'cover',
          }}
          src={homeCoupleImg}
          alt="Groups"
          loading="lazy"
        />
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <GenderButton label="Hombre" destination="/man" />
          <GenderButton label="Mujer" destination="/woman" />
        </Box>
      </Box>
    </>
  );
}
