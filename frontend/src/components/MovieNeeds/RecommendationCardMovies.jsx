import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { FaStar, FaArrowRight } from 'react-icons/fa';

const RecommendationCardMovies = ({ item }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const averageVote = item.vote_average || 0;
  const starCount = Math.round(averageVote / 2); // Assuming a 10-point scale
  const releaseDate = item.release_date || item.first_air_date; // Fallback for shows

  return (
    <motion.div
      onClick={handleFlip}
      style={{
        perspective: 1000,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 300,
          height: 500, // Adjusted height to accommodate release date
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 1,
            bgcolor: '#333',
          }}
        >
          <CardMedia
            component="img"
            alt={item.title || item.name}
            height="300"
            image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent sx={{ bgcolor: '#333', color: 'white', p: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>{item.title || item.name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {[...Array(starCount)].map((_, index) => (
                <FaStar key={index} color="gold" />
              ))}
              {[...Array(5 - starCount)].map((_, index) => (
                <FaStar key={index + starCount} color="#555" />
              ))}
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}
            </Typography>
            <IconButton
              onClick={handleFlip}
              sx={{
                position: 'absolute',
                top: 5,
                right: 5,
                color: 'white',
              }}
            >
              <FaArrowRight />
            </IconButton>
          </CardContent>
        </Card>
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: 2,
            overflow: 'hidden',
            transform: 'rotateY(180deg)',
            bgcolor: '#333',
            color: 'white',
            p: 2,
          }}
        >
          <Typography variant="body1" sx={{ mb: 1 }}>
            {item.overview}
          </Typography>
        </Card>
      </Box>
    </motion.div>
  );
};

export default RecommendationCardMovies;
