import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
import { useAuth } from '../../hooks/AuthContext'; // Import useAuth hook
import logo from '../Logo/png/logo-no-background.png'; // Import the logo image

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State to control dropdown menu

  const { isLoggedIn, userName, logout } = useAuth(); // Use AuthContext

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
      component={motion.div} // Framer Motion integration
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 80 }}
      sx={{
        backgroundColor: scrolled ? 'rgba(26, 26, 26, 0.8)' : 'transparent',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 1300,
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: scrolled ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', maxWidth: '100%', padding: '0 20px' }}>
        {/* Logo Image */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <motion.img
            src={logo}
            alt="SoulSpace Logo"
            initial={{ opacity: 0, scale: 0.8 }} // Initial state of the animation
            animate={{ opacity: 1, scale: 1 }}  // Final state of the animation
            transition={{ duration: 0.5, ease: 'easeOut' }} // Animation timing
            style={{
              height: '50px', // Adjust height for a balanced appearance in the navbar
              width: '80px', // Maintain aspect ratio
              cursor: 'pointer',
              flexGrow: 2, // Ensures the logo aligns properly in the navbar
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
                  color: location.pathname === '/demo' ? '#FFFFFF' : '#C1C1C1',
                  fontWeight: location.pathname === '/demo' ? 'bold' : 'normal',
                }}
              >
                Try Demo
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  marginRight: '1rem',
                  color: location.pathname === '/login' ? '#FFFFFF' : '#C1C1C1',
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
                  color: location.pathname === '/register' ? '#FFFFFF' : '#C1C1C1',
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
                sx={{ color: '#C1C1C1', marginRight: '10px' }}
              >
                Welcome, {userName}!
              </Typography>
              <IconButton onClick={handleMenuOpen}>
                <Avatar sx={{ bgcolor: '#2a2a2a' }}>
                  {userName.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{ '& .MuiPaper-root': { backgroundColor: '#1a1a1a' } }} // Updated background color
              >
                <MenuItem
                  component={Link}
                  to="/user/home"
                  sx={{
                    color: "#C1C1C1",
                    '&:hover': {
                      backgroundColor: '#333333' // Change this to your desired hover background color
                    }
                  }}
                >
                  Home
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    color: "#C1C1C1",
                    '&:hover': {
                      backgroundColor: '#333333' // Change this to your desired hover background color
                    }
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
              sx={{ color: '#C1C1C1', marginRight: '10px' }}
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
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Menu */}
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
                backgroundColor: '#1a1a1a',
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
                      sx={{
                        marginBottom: '1rem',
                        color: location.pathname === '/demo' ? '#FFFFFF' : '#D3D3D3',
                        fontWeight: location.pathname === '/demo' ? 'bold' : 'normal',
                      }}
                    >
                      Try Demo
                    </Button>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/login"
                      sx={{
                        marginBottom: '1rem',
                        color: location.pathname === '/login' ? '#FFFFFF' : '#D3D3D3',
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
                        marginBottom: '1rem',
                        color: location.pathname === '/register' ? '#FFFFFF' : '#D3D3D3',
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
                      sx={{
                        color: "#C1C1C1",
                        '&:hover': {
                          backgroundColor: '#333333' // Change this to your desired hover background color
                        }
                      }}
                    >
                      Home
                    </MenuItem>
                    <Button
                      color="inherit"
                      onClick={handleLogout}
                      sx={{
                        marginBottom: '1rem',
                        color: '#D3D3D3',
                        '&:hover': {
                          backgroundColor: '#333333' // Change this to your desired hover background color
                        }
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
