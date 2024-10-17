import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import RecommendationCardMovies from './RecommendationCardMovies';

const RecommendationsList = ({ isLoading, recommendations }) => (
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 8, // Space between cards
      alignItems: 'flex-start',
    }}
  >
    {isLoading ? (
      <Typography variant="h6">Loading...</Typography>
    ) : (
      recommendations.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          sx={{
            flex: '1 0 calc(25% - 16px)', // Adjust card width and subtract gap
            boxSizing: 'border-box',
            marginBottom: 5, // Space below each card
          }}
        >
          <RecommendationCardMovies item={item} />
        </motion.div>
      ))
    )}
  </Box>
);

export default RecommendationsList;
