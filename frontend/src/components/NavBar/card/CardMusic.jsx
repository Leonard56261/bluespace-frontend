import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import './CardMusic.css'; // Import the updated CSS file
import { useNavigate } from 'react-router-dom';

const CardMusic = ({ title, description, imageUrl, buttonText, location }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(location);
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="modern-card"
      onClick={handleClick}
    >
      <CardMedia
        className="card-media"
        image={imageUrl}
        title={title}
      />
      <CardContent className="card-content">
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="white">
          {description}
        </Typography>
      </CardContent>
      <div className="card-actions">
        <button className="card-button">
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
};

export default CardMusic;
