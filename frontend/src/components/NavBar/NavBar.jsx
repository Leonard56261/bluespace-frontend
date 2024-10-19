import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/AuthContext';
import logo from '../Logo/png/umich.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { isLoggedIn, userName, logout } = useAuth();

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      component={motion.div}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 80 }}
      sx={{
        backgroundColor: scrolled ? 'rgba(0, 31, 63, 0.9)' : '#001f3f',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 1300,
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: scrolled ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none',
        borderBottom: '1px solid rgba(255, 223, 87, 0.3)', // Yellow border
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', maxWidth: '100%', padding: '0 20px' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <motion.img
            src={logo}
            alt="Logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              height: '50px',
              width: '80px',
              cursor: 'pointer',
            }}
          />
        </Link>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {!isLoggedIn && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/demo"
                sx={{
                  marginRight: '1rem',
                  color: location.pathname === '/demo' ? '#FFD700' : '#C1C1C1', // Yellow or gray text
                  fontWeight: location.pathname === '/demo' ? 'bold' : 'normal',
                }}
              >
                Try Us
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  marginRight: '1rem',
                  color: location.pathname === '/login' ? '#FFD700' : '#C1C1C1', // Yellow or gray text
                  fontWeight: location.pathname === '/login' ? 'bold' : 'normal',
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={{
                  color: location.pathname === '/register' ? '#FFD700' : '#C1C1C1', // Yellow or gray text
                  fontWeight: location.pathname === '/register' ? 'bold' : 'normal',
                }}
              >
                Register
              </Button>
            </>
          )}
          {isLoggedIn && (
            <>
              <Typography
                variant="body1"
                sx={{ color: '#FFD700', marginRight: '10px' }} // Yellow text
              >
                Welcome, {userName}!
              </Typography>
              <IconButton onClick={handleMenuOpen}>
                <Avatar sx={{ bgcolor: '#FFD700' }}> {/* Yellow Avatar */}
                  {userName.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{ '& .MuiPaper-root': { backgroundColor: '#001f3f' } }} // Dark blue menu
              >
                <MenuItem
                  component={Link}
                  to="/user/home"
                  onClick={handleMenuClose}
                  sx={{
                    color: "#FFD700", // Yellow text
                    '&:hover': {
                      backgroundColor: '#333333',
                    },
                  }}
                >
                  Home
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleMenuClose();
                  }}
                  sx={{
                    color: "#FFD700", // Yellow text
                    '&:hover': {
                      backgroundColor: '#333333',
                    },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          {isLoggedIn && (
            <Typography
              variant="body1"
              sx={{ color: '#FFD700', marginRight: '10px' }} // Yellow text
            >
              Hey, {userName}!
            </Typography>
          )}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuToggle}
          >
            <MenuIcon sx={{ color: '#FFD700' }} /> {/* Yellow menu icon */}
          </IconButton>
        </Box>
      </Toolbar>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                display: { md: 'none' },
                position: 'absolute',
                top: '64px',
                right: 0,
                backgroundColor: '#001f3f', // Dark blue background
                width: '100%',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {!isLoggedIn && (
                  <>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/demo"
                      onClick={() => handleMobileMenuToggle()}
                      sx={{
                        marginBottom: '1rem',
                        color: location.pathname === '/demo' ? '#FFD700' : '#D3D3D3', // Yellow or gray text
                        fontWeight: location.pathname === '/demo' ? 'bold' : 'normal',
                      }}
                    >
                      Try Demo
                    </Button>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/login"
                      onClick={() => handleMobileMenuToggle()}
                      sx={{
                        marginBottom: '1rem',
                        color: location.pathname === '/login' ? '#FFD700' : '#D3D3D3', // Yellow or gray text
                        fontWeight: location.pathname === '/login' ? 'bold' : 'normal',
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/register"
                      onClick={() => handleMobileMenuToggle()}
                      sx={{
                        marginBottom: '1rem',
                        color: location.pathname === '/register' ? '#FFD700' : '#D3D3D3', // Yellow or gray text
                        fontWeight: location.pathname === '/register' ? 'bold' : 'normal',
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    <MenuItem
                      component={Link}
                      to="/user/home"
                      onClick={() => handleMobileMenuToggle()}
                      sx={{
                        color: "#FFD700", // Yellow text
                        '&:hover': {
                          backgroundColor: '#333333',
                        },
                      }}
                    >
                      Home
                    </MenuItem>
                    <Button
                      color="inherit"
                      onClick={() => {
                        handleLogout();
                        handleMobileMenuToggle();
                      }}
                      sx={{
                        marginBottom: '1rem',
                        color: '#D3D3D3',
                        '&:hover': {
                          backgroundColor: '#333333',
                        },
                      }}
                    >
                      Logout
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </AppBar>
  );
};

export default Navbar;
