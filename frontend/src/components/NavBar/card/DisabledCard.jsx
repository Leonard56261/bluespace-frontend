import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import './CardMusic.css'; // Ensure consistent styles
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DisabledCard = ({ title, description, imageUrl, buttonText }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ rotate: 0, scale: 1 }}
      whileHover={{ scale: 1 }} // No hover effect since it's disabled
      transition={{ type: 'spring', stiffness: 300 }}
      className="modern-card disabled-card" // Add a 'disabled-card' class for specific styling
      sx={{ cursor: 'not-allowed', position: 'relative', overflow: 'hidden' }}
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1, opacity: 0.5 }} />
      <CardMedia
        className="card-media"
        image={imageUrl}
        title={title}
        sx={{ filter: 'grayscale(100%)', zIndex: 0 }}
      />
      <CardContent className="card-content" sx={{ zIndex: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="white">
          {description}
        </Typography>
      </CardContent>
      <div className="card-actions">
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoginClick}
          disabled // Disables the button
          sx={{ cursor: 'not-allowed', zIndex: 2 }}
        >
          {buttonText}
        </Button>
      </div>
    </motion.div>
  );
};

export default DisabledCard;
