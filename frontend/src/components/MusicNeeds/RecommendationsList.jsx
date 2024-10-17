import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import RecommendationCard from './RecommendationCard';

const RecommendationsList = ({ recommendations, loading }) => (
  <Box
    sx={{
      mt: 4,
      width: '100%',
      maxWidth: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 2
    }}
  >
    <Typography variant="h5">Recommendations:</Typography>
    <Divider sx={{ my: 2, borderColor: '#333' }} />
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
      {loading ? (
        <Typography color="white">Loading...</Typography>
      ) : recommendations.length > 0 ? (
        recommendations.map((item) => (
          <RecommendationCard key={item.id} track={item} />
        ))
      ) : (
        <Typography color="white">No recommendations found</Typography>
      )}
    </Box>
  </Box>
);

export default RecommendationsList;
