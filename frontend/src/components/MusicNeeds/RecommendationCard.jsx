// RecommendationCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import { PlayArrow, SkipNext, Repeat, Shuffle, FastRewind } from '@mui/icons-material';
import { motion } from 'framer-motion';

const RecommendationCard = ({ track }) => {
  const spotifyUrl = track.external_urls.spotify; // URL to the track on Spotify

  // Function to handle redirection
  const handleRedirect = () => {
    window.open(spotifyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card
      component={motion.div}
      whileHover={{ scale: 1.05 }}
      sx={{
        width: 250,
        height: 350,
        bgcolor: '#1E1E1E',
        color: 'white',
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={track.album.images[0]?.url || 'https://via.placeholder.com/150'}
        alt={track.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          {track.name}
        </Typography>
        <Typography variant="body2">
          {track.artists.map(artist => artist.name).join(', ')}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, backgroundColor: '#333' }}>
        <IconButton aria-label="play" onClick={handleRedirect} sx={{ color: 'white' }}>
          <PlayArrow />
        </IconButton>
        <IconButton aria-label="next" onClick={handleRedirect} sx={{ color: 'white' }}>
          <SkipNext />
        </IconButton>
        <IconButton aria-label="repeat" onClick={handleRedirect} sx={{ color: 'white' }}>
          <Repeat />
        </IconButton>
        <IconButton aria-label="shuffle" onClick={handleRedirect} sx={{ color: 'white' }}>
          <Shuffle />
        </IconButton>
        <IconButton aria-label="backward" onClick={handleRedirect} sx={{ color: 'white' }}>
          <FastRewind />
        </IconButton>
      </Box>
    </Card>
  );
};

export default RecommendationCard;
