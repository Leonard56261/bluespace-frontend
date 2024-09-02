import React from 'react';
import { Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const InfoCard = ({ title, description, animation, bgColor }) => {
  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      transition={{ duration: 1 }}
    >
      <Paper 
        elevation={3} 
        style={{ 
          padding: '1.5rem', 
          backgroundColor: bgColor, 
          transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
          '&:hover': { 
            transform: 'scale(1.05)', 
            boxShadow: '0 10px 20px rgba(255, 255, 255, 0.5)' 
          } 
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default InfoCard;
