import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Grid, Typography, Alert, Link, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: '#D3D3D3', // Darker shade of white for input text
  },
  '& .MuiInputLabel-root': {
    color: '#A9A9A9', // Greyish color for label
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#A9A9A9', // Greyish border color
    },
    '&:hover fieldset': {
      borderColor: '#808080', // Slightly darker grey on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#D3D3D3', // Darker shade of white when focused
    },
  },
  // Autofill styles
  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 1000px black inset', // Black background for autofilled input
    WebkitTextFillColor: '#D3D3D3', // White text color for autofilled input
  },
  '& input:-webkit-autofill::first-line': {
    color: '#D3D3D3', // White text color for autofilled input's first line
  },
});

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name || !email || !password) {
      setError('All fields are required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Start loading

    if (!validateForm()) {
      setLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      const response = await axios.post(process.env.REACT_APP_REGISTER_URL, { name, email, password });
      if (response.data === 'Registered') {
        setSuccess('Successfully registered');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setError('Registration failed: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212' }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              alt="Phone illustration"
              style={{ width: '100%', height: 'auto' }}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ color: '#D3D3D3', textAlign: 'center', marginBottom: 3 }}
            >
              Create Your Account
            </Typography>
            <form onSubmit={handleRegister} autoComplete="off">
              {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ marginBottom: 2 }}>{success}</Alert>}
              {loading && <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}><CircularProgress color="inherit" /></Box>}
              <Box mb={3}>
                <StyledTextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputLabelProps={{ shrink: !!name }}
                />
              </Box>
              <Box mb={3}>
                <StyledTextField
                  label="Email address"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputLabelProps={{ shrink: !!email }}
                />
              </Box>
              <Box mb={3}>
                <StyledTextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputLabelProps={{ shrink: !!password }}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </Button>
              <Box mt={2} sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#D3D3D3' }}>
                  Already have an account?{' '}
                  <Link href="/login" underline="hover" sx={{ color: '#1E88E5' }}>
                    Log in
                  </Link>
                </Typography>
              </Box>
            </form>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
