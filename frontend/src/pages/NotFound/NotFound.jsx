import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import cuteImageUrl from "../../components/imgs/Notfound.jpg"
// URL of a cute image from Unsplash
// const cuteImageUrl = 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGNyYXZpbmcuY3B8ZW58MHx8fDE2Nzg0NjM2NzI&ixlib=rb-1.2.1&q=80&w=1080';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#121212',
        color: '#ffffff',
        textAlign: 'center',
        p: 3,
      }}
    >
      <motion.img
        src={cuteImageUrl}
        alt="Cute"
        style={{ width: '200px', borderRadius: '15px', marginTop: "30px" }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <Typography variant="h4" sx={{ mt: 3, mb: 1 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        The page you are looking for does not exist. Maybe you mistyped the address or the page has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        sx={{ backgroundColor: '#333', '&:hover': { backgroundColor: '#555' } }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
