import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Grid, Typography, Alert, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../hooks/AuthContext'; // Import useAuth

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
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login from useAuth
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  
  const validateForm = () => {
    if (!email || !password) {
      setError('All fields are required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Start loading

    if (!validateForm()) {
      setLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN_URL, { email, password });
      if (response.status === 200) {
        const { token } = response.data;
        if (token) {
          login(token); // Use the login method from AuthContext
          setSuccess('Log in Successful');
          setTimeout(() => navigate('/user/home'), 1000); // Redirect to the user home page
        } else {
          setError('Login failed: No token received');
        }
      }
    } catch (err) {
      setError('Login failed: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handlePwdChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212' }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6} lg={5}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            alt="Phone illustration"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={5}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ color: '#D3D3D3', textAlign: 'center', marginBottom: 3 }}
          >
            Welcome Back!
          </Typography>
          <form onSubmit={handleLogin} autoComplete="off">
            {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ marginBottom: 2 }}>{success}</Alert>}
            {loading && <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}><CircularProgress color="inherit" /></Box>}
            <Box mb={3}>
              <StyledTextField
                label="Email address"
                variant="outlined"
                fullWidth
                value={email}
                onChange={handleEmailChange}
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
                onChange={handlePwdChange}
                InputLabelProps={{ shrink: !!password }}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              {/* <Box>
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me" style={{ marginLeft: '8px' }}>Remember me</label>
              </Box>
              <a href="#!">Forgot password?</a> */}
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#D3D3D3' }}>
                Don't have an account? <a href="/register" style={{ color: '#3f51b5' }}>Sign up</a>
              </Typography>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
