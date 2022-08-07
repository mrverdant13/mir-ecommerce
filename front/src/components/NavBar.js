import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AccountCircle from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import FemaleIcon from '@mui/icons-material/Female';
import Login from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import MaleIcon from '@mui/icons-material/Male';
import MenuIcon from '@mui/icons-material/Menu';
import Person from '@mui/icons-material/Person';
import PersonAdd from '@mui/icons-material/PersonAdd';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { useAuthContext } from '../context/auth';
import { useCartContext } from '../context/cart';
import LoginForm from './LoginForm';

const cartRoute = '/my-cart';
const signUpRoute = '/sign-up';
const profileRoute = '/me';

const genderPages = [
  {
    label: 'Mujer',
    route: '/women',
    icon: <FemaleIcon fontSize="small" />,
  },
  {
    label: 'Hombre',
    route: '/men',
    icon: <MaleIcon fontSize="small" />,
  },
];

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuthContext();
  const userIsLoggedIn = user != null;

  const [anchorElGenderMenu, setAnchorElGenderMenu] = useState(null);

  const genderMenuIsVisible = Boolean(anchorElGenderMenu);

  const showCartButton = location.pathname !== cartRoute && userIsLoggedIn;

  const openGenderMenu = (event) => {
    setAnchorElGenderMenu(event.currentTarget);
  };

  const closeGenderMenu = () => {
    setAnchorElGenderMenu(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            <Logo />
            <Box sx={{ flexGrow: 1 }}></Box>
            {genderPages.map((page) => (
              <Button
                key={page.label}
                color="inherit"
                onClick={() => navigate(page.route)}
              >
                {page.label}
              </Button>
            ))}
            <Box sx={{ flexGrow: 1 }}></Box>
            {showCartButton && <CartButton />}
            <AccountButton />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', sm: 'none' },
            }}
          >
            <Box sx={{ display: 'flex', flexGrow: 0 }}>
              <Tooltip title="Pages by gender">
                <IconButton
                  size="large"
                  aria-label="Pages by gender"
                  aria-controls="gender-menu"
                  aria-haspopup="true"
                  onClick={openGenderMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id="gender-menu"
                anchorEl={anchorElGenderMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={genderMenuIsVisible}
                onClose={closeGenderMenu}
              >
                {genderPages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={(e) => {
                      closeGenderMenu();
                      navigate(page.route);
                    }}
                  >
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'center',
              }}
            >
              <Logo />
            </Box>
            <AccountButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function Logo() {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate('/')} color="inherit">
      Home
    </Button>
  );
}

function CartButton() {
  const navigate = useNavigate();
  const { cartItems, getCartItems } = useCartContext();
  useEffect(() => {
    getCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cartItemsCount = useMemo(() => cartItems?.length ?? 0, [cartItems]);
  const label = useMemo(() => {
    if (cartItemsCount === 0) return 'no items';
    if (cartItemsCount === 1) return '1 item';
    return `${cartItemsCount} items`;
  }, [cartItemsCount]);
  return (
    <Tooltip title="Cart">
      <IconButton
        size="large"
        aria-label={`Cart with ${label}`}
        aria-controls="cart"
        onClick={() => navigate(cartRoute)}
        color="inherit"
      >
        <Badge
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={cartItemsCount}
          color="error"
          overlap="circular"
        >
          <ShoppingCart />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}

function AccountButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logOut } = useAuthContext();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorElAccountMenu, setAnchorElAccountMenu] = useState(null);
  const [loginFormIsVisible, setLoginFormIsVisible] = useState(false);

  useEffect(() => {
    if (user) setLoginFormIsVisible(false);
  }, [user]);

  const userIsLoggedIn = Boolean(user);

  const showSignUpButton = location.pathname !== signUpRoute;
  const showProfileButton = location.pathname !== profileRoute;

  const accountMenuIsVisible = Boolean(anchorElAccountMenu);

  const openAccountMenu = (event) => {
    setAnchorElAccountMenu(event.currentTarget);
  };

  const closeAccountMenu = () => {
    setAnchorElAccountMenu(null);
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 0 }}>
      <Tooltip title="Account">
        <IconButton
          size="large"
          aria-label="Account"
          aria-controls="account-menu"
          aria-haspopup="true"
          onClick={openAccountMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Menu
        id="account-menu"
        anchorEl={anchorElAccountMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={accountMenuIsVisible}
        onClose={closeAccountMenu}
      >
        {userIsLoggedIn ? (
          <Box>
            {showProfileButton && (
              <MenuItem
                onClick={() => {
                  closeAccountMenu();
                  navigate(profileRoute);
                }}
              >
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">Perfil</Typography>
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                closeAccountMenu();
                logOut();
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center">Cerrar Sesión</Typography>
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem
              onClick={() => {
                closeAccountMenu();
                setLoginFormIsVisible(true);
              }}
            >
              <ListItemIcon>
                <Login fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center">Iniciar Sesión</Typography>
            </MenuItem>
            <Dialog
              fullScreen={fullScreen}
              open={loginFormIsVisible}
              onClose={() => setLoginFormIsVisible(false)}
            >
              {fullScreen && (
                <AppBar sx={{ position: 'relative' }}>
                  <Toolbar>
                    <Box sx={{ flex: 1 }} />
                    <IconButton
                      color="inherit"
                      onClick={() => setLoginFormIsVisible(false)}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                  </Toolbar>
                </AppBar>
              )}
              <LoginForm />
            </Dialog>
            {showSignUpButton && (
              <MenuItem
                onClick={() => {
                  closeAccountMenu();
                  navigate(signUpRoute);
                }}
              >
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">Registrarse</Typography>
              </MenuItem>
            )}
          </Box>
        )}
      </Menu>
    </Box>
  );
}
